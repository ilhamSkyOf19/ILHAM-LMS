import type { FC } from "react"
import { Link } from "react-router-dom";

type Props = {
    link: string;
    label: string;
}

const LinkButtonBorder: FC<Props> = ({ label, link }) => {
    return (
        <Link to={link} className="rounded-full font-semibold text-black capitalize py-3.5 px-5 border border-black bg-white hover:scale-105 transition-all duration-300">
            {label}
        </Link>
    )
}

export default LinkButtonBorder
