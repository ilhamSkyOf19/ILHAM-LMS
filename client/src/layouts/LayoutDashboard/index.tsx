import { useEffect, useRef, useState, type FC, type RefObject } from "react"
import SideBar from "../../fragments/SideBar"
import { Link, Navigate, Outlet, useLoaderData } from "react-router-dom"
import BoxSearch from "../../components/BoxSearch"
import avatar from "../../assets/images/photos/photo-2.png"
import clsx from "clsx"
import type { ResponseData } from "../../types/types"
import type { AuthResponseType } from "../../models/auth-model"
import type { ManagerResponse } from "../../models/manager-model"


// type link
type typeLink = {
    link: string,
    label: string
}

const LayoutDashboard: FC = () => {

    // get user 
    const user = useLoaderData() as {
        manager: ResponseData<ManagerResponse>
    };

    // get manager
    const manager = user.manager?.success ? user.manager.data : null;





    return (
        <div className="w-full min-h-[100vh] flex flex-row justify-start items-start py-2 px-2 relative">
            {/* side bar */}
            <div className="w-[27rem] z-50">
                <SideBar manager={manager as ManagerResponse} />
            </div>

            {/* content */}
            <div className="w-full flex flex-col justify-start items-start pt-4 pr-8 gap-8">
                {
                    manager ? (
                        manager?.bundle ? (
                            <>
                                {/* header */}
                                <HeaderComponent manager={manager} />
                                <Outlet />

                            </>
                        ) : (
                            <>
                                <Navigate to='/dashboard/transaction-bundle' />
                                <Outlet />
                                <HeaderComponent manager={manager} />
                            </>
                        )
                    ) : (
                        <>
                            {/* header */}
                            <HeaderComponent user={null} />
                            <Outlet />
                        </>
                    )
                }

            </div>
        </div>
    )
}



// header

type PropsHeaderComponent = {
    user?: AuthResponseType | null;
    manager?: ManagerResponse | null
}
const HeaderComponent: FC<PropsHeaderComponent> = ({ user, manager }) => {

    // state active
    const [active, setActive] = useState<boolean>(false);


    // ref 
    const userRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // handle active 
    const handleActive = (): void => setActive(!active);




    // handle click outside
    useEffect(() => {
        if (userRef.current && modalRef.current) {
            const userTarget = userRef.current;
            const modalTarget = modalRef.current;

            const handleClickOutside = (event: MouseEvent): void => {
                if (modalTarget && !modalTarget.contains(event.target as Node) && userTarget && !userTarget.contains(event.target as Node)) {
                    setActive(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        }


    }, [userRef, modalRef])



    return (
        <div className="w-full flex flex-row justify-between items-center relative">
            {/* box search */}
            <div className="flex-1 flex flex-row justify-start items-center">
                <BoxSearch />
            </div>
            {/* profile */}
            <div className="flex-1 flex flex-row justify-end items-center gap-2.5">
                <div className="flex flex-col justify-center items-end">
                    <h3 className="font-semibold text-md capitalize text-end">{manager ? manager.name : user?.name}</h3>
                    <p className="text-sm text-slate-400 text-end capitalize">{manager ? manager.role : user?.role.toLocaleLowerCase()}</p>
                </div>

                <button ref={userRef} type="button" name="avatar" className="w-12 h-12" onClick={() => handleActive()}>
                    <img src={avatar} className="w-full h-full object-cover rounded-full" alt="avatar" loading='lazy' />
                </button>
            </div>
            {/* modal user */}
            <ModalUser ref={modalRef as RefObject<HTMLDivElement>} active={active} />
        </div>
    )
}



// modal header

type PropsModalUser = {
    active: boolean;
    ref: RefObject<HTMLDivElement>
}
const ModalUser: FC<PropsModalUser> = ({ active, ref }) => {

    // link
    const link: typeLink[] = [
        {
            link: '/',
            label: 'my account'
        },
        {
            link: '/',
            label: 'subscriptions'
        },
        {
            link: '/',
            label: 'settings'
        }
    ]
    return (
        <div ref={ref} className={clsx(
            "w-[12rem] h-[12rem] border border-slate-300 rounded-2xl absolute top-[120%] right-0 bg-white flex flex-col justify-between items-start py-6 px-6 transition-all duration-300 z-10",
            !active ? 'scale-0 origin-top-right opacity-0' : 'scale-100 origin-top-right opacity-100'
        )}>

            {/* links */}
            {
                link.map((link: typeLink, i: number) => (
                    <Link key={i} to={link.link} className="font-semibold capitalize hover:text-blue-primary transition-all duration-300">{link.label}</Link>
                ))
            }

            {/* logout */}
            <button type="button" name="logout" className="font-semibold capitalize hover:text-blue-primary transition-all duration-300">
                logout
            </button>
        </div>
    )
}

export default LayoutDashboard
