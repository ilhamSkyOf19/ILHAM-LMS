import { type FC } from 'react'


// bg glow 
import bgGlow from '../../assets/images/backgrounds/background-glow.png'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const LayoutGlobal: FC = () => {
    return (
        <div className='w-full h-[100vh] flex flex-row justify-center items-center'>
            <div className='w-[99%] h-[96vh] bg-[#060A23] flex flex-col items-start justify-start rounded-2xl overflow-hidden relative pt-10'>
                {/* bg glow */}
                <img
                    src={bgGlow}
                    className='absolute object-contain object-bottom bottom-0 w-full z-0'
                />

                {/* navbar */}
                <Navbar />


                {/* content */}
                <div className='flex-6 w-full h-full overflow-y-auto z-10 scroll-transparent overflow-x-hidden'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default LayoutGlobal
