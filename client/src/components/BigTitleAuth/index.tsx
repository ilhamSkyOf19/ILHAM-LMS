import type { FC } from 'react'


type Props = {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
}

const BigTitleAuth: FC<Props> = ({ text1, text2, text3, text4 }) => {
    return (
        <div className='flex flex-col justify-start items-start gap-6'>
            <h1 className='text-5xl font-extrabold text-white leading-[4rem]'>
                {text1} <br />
                {text2}
            </h1>
            <p className='text-lg text-white leading-[2rem]'>
                {text3} <br />
                {text4}
            </p>
        </div>

    )
}

export default BigTitleAuth
