import { type FC } from 'react'


// bg glow 
import bgGlow from '../../assets/images/backgrounds/background-glow.png'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const LayoutGlobal: FC = () => {
    return (
        <div className='w-full h-[100vh] p-2'>
            <div className='w-full h-[97vh] bg-[#060A23] relative flex flex-col items-start justify-start py-4 rounded-2xl'>
                {/* bg glow */}
                <img
                    src={bgGlow}
                    className='absolute object-contain object-bottom bottom-0 w-full z-0'
                />

                {/* navbar */}
                <Navbar />


                {/* content */}
                <div className='w-full h-full overflow-y-auto z-10 scroll-transparent pt-12'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default LayoutGlobal
