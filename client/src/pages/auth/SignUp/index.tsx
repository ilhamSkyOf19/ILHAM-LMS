import { type FC } from 'react'
import FormLayout from '../../../components/FormLayout'



const SignUp: FC = () => {
    return (
        <div className='w-full h-full relative flex flex-row justify-between items-center px-12'>

            {/* form */}
            <div className='flex-1 flex flex-row justify-center items-center'>
                <FormLayout />
            </div>

            {/* big title */}
            <div className='flex-1'>

            </div>

        </div>
    )
}

export default SignUp
