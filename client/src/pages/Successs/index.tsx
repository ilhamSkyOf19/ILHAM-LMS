import { type FC } from 'react'
import LinkButtonBlue from '../../components/LinkButtonBlue'

const Success: FC = () => {
    return (
        <div className='w-full h-[100vh] flex flex-col justify-center items-center gap-2'>
            {/* message  */}
            <h1 className='text-blue-primary text-5xl font-extrabold capitalize'>
                Payment Success
            </h1>
            <h1 className='text-blue-primary text-3xl font-extrabold capitalize'>
                now you can start <span className='text-black'>create your course</span>
            </h1>

            {/* button dashboard */}
            <LinkButtonBlue link={'/dashboard'} label={'Go to dashboard'} />
        </div>
    )
}

export default Success
