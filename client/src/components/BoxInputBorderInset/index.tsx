import { type FC } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'




type Props = {
    type: 'email' | 'password' | 'text';
    register: UseFormRegisterReturn;
    placeholder: string;
    name: string;
    icon: string;

}



const BoxInputBorderInset: FC<Props> = ({ type, register, placeholder, name, icon }) => {
    return (
        <div className='w-full flex flex-row justify-start items-center gap-3 border border-border-color-primary rounded-full py-3.5 px-4 shadow-[-10px_-6px_10px_0_#181A35_inset] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] focus-within:border-purple-primary transition-all duration-300'>

            {/* icon */}
            <label htmlFor={name} className='flex flex-row justify-start items-center'>
                <img src={icon} className='w-6 h-6 flex shrink-0' alt="icon" loading='lazy' />
            </label>

            {/* input */}
            <input
                {...register}
                type={type}
                name={name}
                id={name}
                className='appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F] text-sm'
                placeholder={placeholder}
            />

        </div>
    )
}

export default BoxInputBorderInset
