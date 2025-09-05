import type { FC } from "react"

type Props = {
    type: 'submit' | 'button';
    label: string;
}

const ButtonBorderHoverBlue: FC<Props> = ({ type, label }) => {
    return (
        <button type={type} className="rounded-full font-semibold text-black capitalize py-3.5 px-5 border border-black bg-white hover:bg-blue-primary hover:text-white hover:border-blue-primary transition-all duration-300">
            {label}
        </button>
    )
}

export default ButtonBorderHoverBlue
