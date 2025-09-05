import { useState, type FC } from "react"
import TitleContentDashboard from "../../../fragments/TitleContentDashboard"
import ButtonBorder from "../../../components/ButtonBorder"
import ButtonBlue from "../../../components/ButtonBlue"
import CourseCard from "../../../components/CourseCard"
import ButtonPagination from "../../../components/ButtonPagination"

const DashboardCourses: FC = () => {
    // state active 
    const [active, setActive] = useState<number>(1);


    // handle active

    const handleActive = (number: number): void => {
        setActive(number);
    }


    return (
        <div className="w-full flex flex-col justify-start items-start gap-8 pb-8">
            {/* header content */}
            <TitleContentDashboard title="Manage Courses" desc="Give the best future for your great employees">
                <ButtonBorder type="button" label="customize" />
                <ButtonBlue type="button" label="new course" />
            </TitleContentDashboard>


            {/* content */}
            <div className="w-full flex flex-col justify-start items-start rounded-2xl bg-white-secondary py-8 px-6 gap-8">

                {/* manage card content */}
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />

                {/* pagination */}
                <div className="w-full flex flex-row justify-start items-start gap-4">
                    {
                        [1, 2, 3, 4, 5].map((_, index: number) => (
                            <ButtonPagination
                                key={index} active={active === index + 1}
                                number={index + 1}
                                handleClick={() => handleActive(index + 1)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardCourses
