import { type FC } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc';


type Props = {
    handleSetEye: () => void;
    type: 'password' | 'text'
    color: 'white' | 'black'
}
const ButtonEye: FC<Props> = ({ handleSetEye, type, color }) => {
    return (
        <button type='button' className={`h-full ${color === 'white' ? 'text-white' : 'text-black'}`} onClick={handleSetEye}>
            {/* eye icon */}
            {type === 'password' ? (
                <VscEye className='w-6 h-6 flex shrink-0' />
            ) : (
                <VscEyeClosed className='w-6 h-6 flex shrink-0' />
            )}
        </button>
    )
}

export default ButtonEye
