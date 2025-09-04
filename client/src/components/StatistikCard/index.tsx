import { type FC } from 'react'

type Props = {
    icon: string;
    number: number;
    label: string;
}

const StatistikCard: FC<Props> = ({ icon, number, label }) => {
    return (
        <div className="flex-1 h-[10rem] bg-white shadow-md rounded-2xl py-6 px-3 flex flex-col justify-between items-start hover:shadow-blue-primary transition-all duration-300 cursor-pointer">
            <img src={icon} className="w-10" alt="icon" />

            <div className='flex flex-col justify-start items-start'>
                {/* value */}
                <h3 className='font-extrabold text-black text-2xl'>
                    {number.toLocaleString('en-US')}
                </h3>

                {/* label */}
                <p className='text-sm text-slate-400 capitalize'>{label}</p>
            </div>
        </div>
    )
}

export default StatistikCard
