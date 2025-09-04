import { type FC } from 'react'
import clsx from 'clsx'


type Porps = {
    type: 'button' | 'submit' | 'reset'
    label: string
}
const ButtonBorderInset: FC<Porps> = ({ type, label }) => {

    return (
        <button type={type} className={clsx(
            'w-full text-white font-bold capitalize rounded-full border border-[#24283E] py-3.5 px-7 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:bg-blue-primary transition-all duration-300 shadow-[-10px_-6px_10px_0_#181A35_inset] bg-transparent',
        )}>{label}</button>
    )
}

export default ButtonBorderInset
