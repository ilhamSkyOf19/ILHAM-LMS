import { type FC } from 'react'
import iconDelete from '../../assets/images/icons/delete.svg'

type Props = {
    handleClick: () => void
}
const ButtonTrash: FC<Props> = ({ handleClick }) => {
    return (
        <button type='button' className='w-10' onClick={handleClick}>
            <img src={iconDelete} alt={'icon delete'} className='w-full' loading='lazy' />
        </button>
    )
}

export default ButtonTrash
