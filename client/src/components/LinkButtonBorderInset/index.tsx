import { type FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'


type Porps = {
    link: string;
    label: string
    active?: boolean
}
const LinkButtonBorderInset: FC<Porps> = ({ link, label, active }) => {

    // pathname 

    return (
        <Link to={`${link}`} className={clsx(
            'text-white font-bold capitalize rounded-full border border-[#24283E] py-3.5 px-7 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:bg-blue-primary transition-all duration-300',
            active ? 'bg-blue-primary shadow-[-10px_-6px_10px_0_#7F33FF_inset]' : 'shadow-[-10px_-6px_10px_0_#181A35_inset] bg-transparent'
        )}>{label}</Link>
    )
}

export default LinkButtonBorderInset
