import { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LinkButtonBorderInset from '../LinkButtonBorderInset';


type Menu = {
    link: string;
    label: string;
}



const Navbar: FC = () => {

    // navbar 
    const menu: Menu[] = [
        {
            link: '/',
            label: 'Home'
        },
        {
            link: '/bundle',
            label: 'Bundle'
        },
        {
            link: '/course',
            label: 'Course'
        },
        {
            link: '/about',
            label: 'About'
        }
    ]


    // pathname 
    const pathname = useLocation().pathname;




    return (
        <nav className='absolute flex flex-row justify-between items-center px-12 py-4 z-50 top-0 w-[99%] backdrop-blur-lg'>

            {/* title */}
            <h1 className='flex-1 font-bold text-white text-2xl'>Ilham | LMS</h1>


            {/* menu */}
            <div className='flex-3 flex flex-row justify-start items-strat gap-8'>
                {
                    menu.map((item: Menu, index: number) => (
                        <Link to={item.link} key={index} className='font-semibold text-white hover:text-blue-primary transition-all duration-200 capitalize'>{item.label}</Link>
                    )
                    )
                }
            </div>


            {/* button sign up or button sign in  */}
            <div className='flex-2 flex flex-row justify-end items-center gap-6'>
                {/* button manager */}
                <LinkButtonBorderInset link='/manager/sign-in' label='manager' active={pathname.includes('/manager')} />


                {/* button student */}
                <LinkButtonBorderInset link='/student/sign-in' label='student' active={pathname.includes('/student')} />

            </div>
        </nav>
    )
}

export default Navbar
