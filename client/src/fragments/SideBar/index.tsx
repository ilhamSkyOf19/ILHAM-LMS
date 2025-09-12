import { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

// icons
import cube from '../../assets/images/icons/3dcube-white.svg';
import noteFavoriteWhite from '../../assets/images/icons/note-favorite-white.svg';
import crownWhite from '../../assets/images/icons/crown-white.svg';
import profile2UserWhite from '../../assets/images/icons/profile-2user-white.svg';
import securityCardWhite from '../../assets/images/icons/security-card-white.svg';
import cupWhite from '../../assets/images/icons/cup-white.svg';
import settingWhite from '../../assets/images/icons/setting-2-white.svg';
import sidebarGlow from '../../assets/images/backgrounds/sidebar-glow.png';
import type { AuthResponseType } from '../../models/auth-model';


// type menu
type Menu = {
    link: string;
    label: string;
    icon: string;
}


// props 
type Props = {
    user: AuthResponseType | null;
}



const SideBar: FC<Props> = ({ user }) => {

    // menu general 
    const generalManager: Menu[] = [
        {
            link: '/dashboard',
            label: 'Dashboard',
            icon: cube
        },
        {
            link: '/dashboard/courses',
            label: 'Courses',
            icon: noteFavoriteWhite
        },
        {
            link: '/dashboard/categories',
            label: 'Categories',
            icon: crownWhite
        },
        {
            link: '/dashboard/students',
            label: 'Students',
            icon: profile2UserWhite
        }
    ]

    // general student
    const generalStudent: Menu[] = [
        {
            link: '/dashboard',
            label: 'Dashboard',
            icon: cube
        },
        {
            link: '/dashboard/courses',
            label: 'Courses',
            icon: noteFavoriteWhite
        }
    ]


    const others: Menu[] = [
        {
            link: '/dashboard/subscriptions',
            label: 'Subscriptions',
            icon: securityCardWhite
        },
        {
            link: '/dashboard/rewards',
            label: 'Rewards',
            icon: cupWhite
        },
        {
            link: '/dashboard/settings',
            label: 'Settings',
            icon: settingWhite
        }
    ]





    return (
        <div className='w-[18rem] rounded-2xl bg-[#060A23] h-[97vh] fixed flex flex-col justify-start items-start overflow-hidden'>

            {/* background glow */}
            <img src={sidebarGlow} className='absolute object-contain object-bottom bottom-0 left-0 w-full z-0' />


            <div className='w-full flex flex-col justify-start items-start z-10 overflow-auto no-scroll py-8 px-6'>
                {/* title */}
                <h1 className='text-white text-2xl font-bold mb-12'>
                    Ilham | LMS
                </h1>


                {/* menu  general */}
                <div className='w-full mb-8'>
                    <MenuComponent title='general' menu={user?.role === 'STUDENT' ? generalStudent : generalManager} />
                </div>

                {/* menu  others */}
                <MenuComponent title='others' menu={others} />
            </div>

        </div>
    )
}




// menu component


type PropsMenuComponent = {
    title: string;
    menu: Menu[];
}
const MenuComponent: FC<PropsMenuComponent> = ({ title, menu }) => {

    // use location
    const pathname: string = useLocation().pathname;


    return (
        <div className='w-full flex flex-col justify-start items-start gap-4 '>
            <h2 className='text-sm uppercase font-semibold text-white'>{title}</h2>

            {/* menu */}
            <div className='w-full flex flex-col justify-start items-start gap-4'>
                {/* box menu */}

                {
                    menu.map((menu: Menu, i: number) => (
                        <BoxMenu key={i} link={menu.link} label={menu.label} icon={menu.icon} active={menu.link === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(menu.link)} />
                    ))
                }
            </div>
        </div>
    )
}



// box menu


type PropsBoxMenu = {
    link: string;
    label: string;
    icon: string;
    active: boolean
}


const BoxMenu: FC<PropsBoxMenu> = ({ link, label, icon, active }) => {
    return (
        <Link to={link} className={clsx(
            'w-full py-3.5 px-4  flex flex-row justify-start items-center gap-4 rounded-full border border-border-color-primary hover:bg-blue-primary hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] transition-all duration-300',
            active ? 'bg-blue-primary shadow-[-10px_-6px_10px_0_#7F33FF_inset]' : 'shadow-[-10px_-6px_10px_0_#181A35_inset] bg-[#060A23]'
        )}>
            {/* icon */}
            <img src={icon} className='w-7 flex shrink-0' alt="icon" loading='lazy' />
            {/* label */}
            <h2 className='text-md font-bold text-white'>{label}</h2>
        </Link>
    )
}
export default SideBar
