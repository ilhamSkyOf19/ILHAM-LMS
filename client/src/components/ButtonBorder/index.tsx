import type { FC } from "react"

type Props = {
    type: 'submit' | 'button';
    label: string;
}

const ButtonBorder: FC<Props> = ({ type, label }) => {
    return (
        <button type={type} className="rounded-full font-semibold text-black capitalize py-3.5 px-5 border border-black bg-white hover:scale-105 transition-all duration-300">
            {label}
        </button>
    )
}

export default ButtonBorder
