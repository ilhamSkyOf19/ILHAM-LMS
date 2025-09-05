import { type FC } from 'react'

type Props = {
    icon: string;
    label: string;
}

const DescCard: FC<Props> = ({ icon, label }) => {
    return (
        <div className='flex flex-row justify-start items-center gap-2'>

            {/* icon */}
            <img src={icon} alt='icon' className='w-5' loading='lazy' />

            {/* label */}
            <p className='text-slate-500 capitalize'>{label}</p>
        </div>
    )
}

export default DescCard
