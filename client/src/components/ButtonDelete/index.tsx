import { type FC } from 'react'


type Props = {
    type: 'button' | 'submit';
    label: string;
    handleDelete: () => void
}
const ButtonDelete: FC<Props> = ({ type, label, handleDelete }) => {
    return (
        <button type={type} className='py-3.5 px-5 bg-red-500 text-white font-semibold hover:scale-105 transition-all duration-300 capitalize rounded-full' onClick={handleDelete}>
            {label}
        </button>
    )
}

export default ButtonDelete
