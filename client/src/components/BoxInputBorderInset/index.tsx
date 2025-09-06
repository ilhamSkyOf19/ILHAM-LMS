import { useState, type FC } from 'react'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage';
import clsx from 'clsx';
import ButtonEye from '../ButtonEye';




type Props = {
    type: 'email' | 'password' | 'text';
    register: UseFormRegisterReturn;
    placeholder: string;
    name: string;
    icon: string;
    error?: FieldError

}



const BoxInputBorderInset: FC<Props> = ({ type, register, placeholder, name, icon, error }) => {

    // state eye 
    const [eye, setEye] = useState<{ isOpen: boolean, type: 'password' | 'text' }>({
        isOpen: false,
        type: 'password'
    })


    // handle eye 
    const handleSetEye = (): void => {
        setEye({
            isOpen: !eye.isOpen,
            type: eye.type === 'password'
                ? 'text'
                : 'password'
        });
    }

    return (
        <div className='w-full flex flex-col justify-start items-start gap-1'>
            <div className={clsx(
                'w-full flex flex-row justify-start items-center gap-3 border border-border-color-primary rounded-full py-3.5 px-4 shadow-[-10px_-6px_10px_0_#181A35_inset] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] focus-within:border-purple-primary transition-all duration-300',
                error ? 'ring-1 ring-red-500 focus-within:border-red-500 focus-within:shadow-[-10px_-6px_10px_0_#fb2c36_inset]' : 'focus-within:ring-1 focus-within:ring-blue-primary'
            )}>

                {/* icon */}
                <label htmlFor={name} className='flex flex-row justify-start items-center'>
                    <img src={icon} className='w-6 h-6 flex shrink-0' alt="icon" loading='lazy' />
                </label>

                {/* input */}
                <input
                    {...register}
                    type={type === 'password' ? eye.type : type}
                    name={name}
                    id={name}
                    className='appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F] text-sm'
                    placeholder={placeholder}
                />

                {/* eye */}
                {
                    type === 'password' && (
                        <ButtonEye handleSetEye={handleSetEye} type={eye.type} color='white' />
                    )
                }
            </div>

            {/* error message */}
            <ErrorMessage error={error} />
        </div>
    )
}

export default BoxInputBorderInset
