import clsx from 'clsx';
import { type FC } from 'react'


type Props = {
    active: boolean;
    number: number;
    handleClick: (number: number) => void
}

const ButtonPagination: FC<Props> = ({ active, number, handleClick }) => {
    return (
        <button className={clsx(
            "w-10 h-10 flex flex-col justify-center items-center rounded-full border hover:bg-blue-primary hover:border-blue-primary transition-all duration-200 group",
            active ? 'bg-blue-primary border-blue-primary' : 'bg-white border-black'
        )} onClick={() => handleClick(number)}>
            <p className={clsx(
                "font-medium group-hover:text-white transition-all duration-200",
                active ? 'text-white' : 'text-black'
            )}>{number}</p>
        </button>
    )
}

export default ButtonPagination
