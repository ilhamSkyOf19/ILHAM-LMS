import type { FC } from "react"

type Props = {
    type: 'submit' | 'button';
    label: string;
    disabled?: boolean
}

const ButtonBlueShadowPurple: FC<Props> = ({ type, label, disabled }) => {
    return (
        <button type={type} disabled={disabled} className="w-full rounded-full font-bold text-white capitalize py-3.5 border-purple-primary shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-blue-primary hover:bg-transparent transition-all duration-300 ">
            {label}
        </button>
    )
}

export default ButtonBlueShadowPurple
