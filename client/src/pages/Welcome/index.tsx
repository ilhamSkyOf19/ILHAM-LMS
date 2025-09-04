import { type FC } from 'react'

const Welcome: FC = () => {
    return (
        <div className='w-full flex flex-row justify-center items-end h-[50vh] pt-12 z-10'>
            <h1 className='font-bold text-white text-5xl text-center leading-[4rem]'>Welcome aboard, let’s <br /> get started on your journey.</h1>
        </div>
    )
}

export default Welcome
