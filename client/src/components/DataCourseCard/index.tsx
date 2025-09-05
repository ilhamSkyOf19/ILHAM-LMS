import { type FC } from 'react'

type Props = {
    icon: string;
    label: string
}

const DataCourseCard: FC<Props> = ({ icon, label }) => {
    return (
        <div className='w-full h-full bg-white shadow-md rounded-2xl flex flex-col justify-between items-start py-5 px-4 border border-slate-200 hover:shadow-blue-primary hover:-translate-y-1 transition-all duration-300'>
            {/* icon */}
            <img src={icon} className='w-10' alt="icon" loading='lazy' />

            {/* label */}
            <p className='text-black font-semibold capitalize'>{label}</p>
        </div>
    )
}

export default DataCourseCard
