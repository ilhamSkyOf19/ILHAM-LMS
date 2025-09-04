import { type FC } from 'react'


// icons
import crownPurple from '../../assets/images/icons/crown-purple.svg'




type Props = {
    avatar: string
    name: string;
    total_course: number
}
const StudentCard: FC<Props> = ({ avatar, name, total_course }) => {
    return (
        <div className="w-full flex flex-row justify-start items-center gap-6 group">
            {/* avatar */}
            <div className="w-[8rem] h-[5.5rem] rounded-3xl overflow-hidden">
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* label */}
            <div className='w-full flex flex-col justify-start items-start gap-1.5'>

                {/* title */}
                <h2 className='font-bold text-xl tex-black group-hover:text-blue-primary capitalize'>
                    {name}
                </h2>

                {/* category */}
                <div className='w-full flex flex-row justify-start items-start gap capitalize gap-2'>
                    <img src={crownPurple} alt="crown" className='w-5' loading='lazy' />
                    <p className='text-slate-400 capitalize'>{total_course} course joined</p>
                </div>
            </div>
        </div>
    )
}

export default StudentCard
