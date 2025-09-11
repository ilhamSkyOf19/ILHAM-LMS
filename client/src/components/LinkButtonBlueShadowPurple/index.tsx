import type { FC } from "react"
import { Link } from "react-router-dom";

type Props = {
    link: string;
    label: string;
}

const LinkButtonBlueShadowPurple: FC<Props> = ({ link, label }) => {
    return (
        <Link to={link} className="w-full rounded-full font-bold text-white capitalize py-3.5 border-purple-primary shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-blue-primary hover:bg-transparent transition-all duration-300 text-center ">
            {label}
        </Link>
    )
}

export default LinkButtonBlueShadowPurple
