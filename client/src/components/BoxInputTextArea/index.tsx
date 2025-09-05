import { type FC } from 'react'

import note from '../../assets/images/icons/note-black.png'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage';


type Props = {
    register: UseFormRegisterReturn;
    error?: FieldError
}

const BoxInputTextArea: FC<Props> = ({ register, error }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start'>
            {/* label */}
            <label htmlFor='name' className='text-black font-semibold capitalize mb-2'>
                description
            </label>

            {/* text area */}
            <div
                className={clsx(
                    'w-full h-[10rem] border border-slate-300 rounded-3xl py-4 px-5 flex flex-row justify-start items-start gap-3',
                    error ? 'ring-1 ring-red-500' : 'focus-within:ring-1 focus-within:ring-blue-primary'
                )}

            >
                {/* label icon */}
                <label htmlFor='description' className='flex flex-row justify-start items-start h-full'>
                    <img src={note} className='w-6.5' alt="icon" loading='lazy' />
                </label>

                {/* text area */}
                <textarea
                    {...register}
                    id='description'
                    placeholder='Explain what this course about'
                    className='font-semibold text-black placeholder:font-normal placeholder:text-slate-400 w-full h-full outline-none bg-white'
                />
            </div>

            {/* error */}
            <ErrorMessage error={error} />
        </div>
    )
}

export default BoxInputTextArea
