import { type FC } from 'react'
import { Link } from 'react-router-dom'


type Props = {
    link: string;
    label: string;
}

const LinkButtonBlue: FC<Props> = ({ link, label }) => {
    return (
        <Link to={`${link}`} className={`text-white font-bold capitalize bg-blue-primary rounded-full py-3.5 px-7 shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:shadow-[-10px_-6px_10px_0_#181A35_inset] hover:bg-transparent transition-all duration-300`}>
            {label}
        </Link>
    )
}

export default LinkButtonBlue
