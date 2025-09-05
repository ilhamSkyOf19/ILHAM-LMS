import type { FC } from "react"

const NotFound: FC = () => {
    return (
        <div className='w-full h-[100vh] bg-[#060A23] flex flex-row justify-center items-center gap-7'>
            <h1 className="text-white text-6xl">404</h1>
            <h1 className="text-white text-6xl font-extralight">|</h1>
            <h1 className="text-white text-3xl">Not Found</h1>
        </div>
    )
}

export default NotFound
