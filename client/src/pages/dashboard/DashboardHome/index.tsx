import type { FC } from "react"
import ButtonBlue from "../../../components/ButtonBlue"
import ButtonBorder from "../../../components/ButtonBorder"
import TitleContentDashboard from "../../../fragments/TitleContentDashboard"
import StatistikCard from "../../../components/StatistikCard"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'



// icons 
import user from "../../../assets/images/icons/profile-2user-purple.svg"
import noteFavorite from "../../../assets/images/icons/note-favorite-purple.svg"
import videoPlay from "../../../assets/images/icons/video-play-purple.svg"
import note from '../../../assets/images/icons/note-purple.svg'
import { useLoaderData } from "react-router-dom"
import { persentase } from "../../../helpers/persentase"




const DashboardHome: FC = () => {


    // get data 
    const statistik = useLoaderData()[0];



    return (
        <div className="w-full h-[200vh] flex flex-col justify-start items-start gap-8">
            {/* header content */}
            <TitleContentDashboard title=" dashboard" desc="Grow your company quickly">
                <ButtonBorder type="button" label="customize" />
                <ButtonBlue type="button" label="create course" />
            </TitleContentDashboard>

            {/* statistik  */}
            <div className="w-full flex row justify-between items-center bg-white-secondary p-8 rounded-2xl gap-4">
                {/* statistik number */}
                <div className="flex-3 flex flex-col justify-between items-center gap-5">

                    {/* statistik 1 */}
                    <div className="w-full flex flex-row justify-between items-center gap-5">
                        {/* total students */}
                        <StatistikCard icon={user} number={statistik.total_students} label="total students" />
                        {/* total course */}
                        <StatistikCard icon={noteFavorite} number={statistik.total_courses} label="total courses" />
                    </div>


                    {/* statistik 2 */}
                    <div className="w-full flex flex-row justify-between items-center gap-5">
                        {/* total video content */}
                        <StatistikCard icon={videoPlay} number={statistik.total_video_content} label="total video content" />
                        {/* total course */}
                        <StatistikCard icon={note} number={statistik.total_text_content} label="total text content" />
                    </div>

                </div>
                <div className="flex-2 h-full flex flex-row justify-center items-center">
                    <StatistikDonut />
                </div>
            </div>
        </div>
    )
}




// statistik donut
const StatistikDonut: FC = () => {

    const dataChart = [
        {
            data: "Complated",
            value: 2000
        },
        {
            data: "Not Complated",
            value: 650
        }
    ]


    // persentase 
    const totalData = dataChart.reduce((acc, curr) => acc + curr.value, 0)


    return (
        <div className="w-full h-full shadow-md rounded-2xl hover:shadow-blue-primary transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-start items-center">
            {/* chart */}
            <div className="w-full h-[15rem]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={dataChart}
                            dataKey="value"
                            nameKey="data"
                            cx={"50%"}
                            cy={"50%"}
                            innerRadius={60}
                            outerRadius={115}
                            paddingAngle={0.5}
                        >

                            {/* label */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-black font-bold "
                            >
                                <tspan x="50%" dy="-0.5em" fontSize="20">Our</tspan>
                                <tspan x="50%" dy="1em" fontSize="20">Statistik</tspan>
                            </text>


                            <Tooltip />
                            <Cell fill="#bd00ff" />
                            <Cell fill="#e066ff" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* desc */}
            <div className="w-full flex flex-col justify-start items-start gap-2 px-4 mt-8">
                <div className="w-full flex flex-row justify-start items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#bd00ff]" />
                    <p className="text-sm font-semibold">Complated: {persentase(dataChart[0].value, totalData)}%</p>
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#e066ff]" />
                    <p className="text-sm font-semibold">Not Complated: {persentase(dataChart[1].value, totalData)}%</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome
