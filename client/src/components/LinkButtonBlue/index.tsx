import type { FC } from "react"
import { Link } from "react-router-dom";

type Props = {
    link: string
    label: string;
}

const LinkButtonBlue: FC<Props> = ({ link, label }) => {
    return (
        <Link to={link} className="rounded-full font-semibold text-white capitalize py-3.5 px-5 border-purple-primary shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:scale-105 bg-blue-primary transition-all duration-300">
            {label}
        </Link>
    )
}

export default LinkButtonBlue
