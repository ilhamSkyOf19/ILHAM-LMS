import type { FC } from "react"
import SideBar from "../../fragments/SideBar"
import { Outlet } from "react-router-dom"
import BoxSearch from "../../components/BoxSearch"

const LayoutDashboard: FC = () => {
    return (
        <div className="w-full min-h-[100vh] flex flex-row justify-start items-start py-2 px-2 relative">
            {/* side bar */}
            <div className="flex-1">
                <SideBar />
            </div>

            {/* content */}
            <div className="flex-3 h-[200vh] flex flex-col justify-start items-start pt-4">
                {/* header */}

                <div className="w-full flex flex-row justify-between items-center">
                    {/* box search */}
                    <div className="w-[50%]">
                        <BoxSearch />
                    </div>
                </div>


                <Outlet />
            </div>
        </div>
    )
}

export default LayoutDashboard
