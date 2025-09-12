import type { FC } from "react"

type Props = {
    type: 'button' | 'submit' | 'reset';
    label: string;
    disabled?: boolean
}

const ButtonBlue: FC<Props> = ({ type, label, disabled }) => {
    return (
        <button type={type} disabled={disabled} className="w-full rounded-full font-semibold text-white capitalize py-3.5 px-5 border-purple-primary shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:scale-105 bg-blue-primary transition-all duration-300">
            {label}
        </button>
    )
}

export default ButtonBlue
