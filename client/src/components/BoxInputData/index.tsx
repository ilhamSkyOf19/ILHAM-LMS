import { type FC } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';





type Props = {
    type: 'text' | 'password' | 'email';
    name: string;
    placeholder: string;
    label: string;
    icon: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}



const BoxInputData: FC<Props> = ({ type, name, placeholder, label, register, error, icon }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start'>
            {/* label text */}
            <label htmlFor='name' className='text-black font-semibold capitalize mb-2'>
                {label}
            </label>

            {/* box input */}
            <div className={clsx(
                'w-full border border-slate-300 rounded-full py-3 px-5 flex flex-row justify-start items-start gap-3 mb-1.5  transition-all duration-200',
                error?.message ? 'ring-1 ring-red-500' : 'focus-within:ring-1 focus-within:ring-blue-primary'
            )}>
                {/* label icon */}
                <label htmlFor='name'>
                    <img src={icon} className='w-6.5' alt="icon" loading='lazy' />
                </label>
                {/* input */}
                <input
                    {...register}
                    id={name}
                    type={type}
                    name={name}
                    aria-invalid={!!error}
                    className='w-full outline-none text-black font-semibold placeholder:font-normal placeholder:text-slate-400'
                    placeholder={placeholder}

                />
            </div>

            {/* error message */}
            <div className='w-full min-h-8'>
                <p className={clsx(
                    'text-red-500 text-xs transition-all duration-200',
                    error ? 'visible' : 'invisible'
                )}>{error?.message}</p>
            </div>
        </div>
    )
}

export default BoxInputData
