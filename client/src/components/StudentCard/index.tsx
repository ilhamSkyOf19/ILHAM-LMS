import { type FC } from 'react'


// icons
import crownPurple from '../../assets/images/icons/crown-purple.svg'
import DescCard from '../DescCard';




type Props = {
    avatar: string
    name: string;
    total_course: number
}
const StudentCard: FC<Props> = ({ avatar, name, total_course }) => {
    return (
        <div className="w-full flex flex-row justify-start items-center gap-6 group">
            {/* avatar */}
            <div className="w-[5.5rem] h-[5rem] rounded-3xl overflow-hidden">
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* label */}
            <div className='flex flex-col justify-start items-start gap-1.5'>

                {/* title */}
                <h2 className='font-bold text-xl tex-black group-hover:text-blue-primary capitalize'>
                    {name}
                </h2>

                {/* category */}
                <DescCard icon={crownPurple} label={`${total_course} courses joined`} />
            </div>
        </div>
    )
}

export default StudentCard
