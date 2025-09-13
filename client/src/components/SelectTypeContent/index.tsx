import { useEffect, useRef, useState, type FC } from 'react'
import type { FieldError, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import type { CreateContentModel } from '../../models/content-model'
import clsx from 'clsx'


import arrow from '../../assets/images/icons/arrow-down.svg'
import crown from '../../assets/images/icons/crown-black.svg'
import ModalSelect from '../ModalSelect'
import ErrorMessage from '../ErrorMessage'


type Props = {
    label: string
    register: UseFormRegisterReturn
    error?: FieldError
    name: string;
    setType: (value: 'video' | 'text') => void
    setValue: UseFormSetValue<CreateContentModel>
    clearErrors: UseFormClearErrors<CreateContentModel>
}



const SelectTypeContent: FC<Props> = ({ label, register, error, name, setValue, clearErrors, setType }) => {

    // state model select
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // set value select
    const [valueSelect, setValueSelect] = useState<'video' | 'text'>('video');


    // req select & modal select 
    const selectRef = useRef<HTMLDivElement>(null);


    // handle open modal select
    const handleOpenModal = (): void => setIsOpen(!isOpen);

    // handle sleect 
    const handleSelect = (value: 'video' | 'text'): void => {
        setType(value);
        clearErrors('type');
        setValue('type', value);
        setValueSelect(value);
    }

    // handle click outside 
    useEffect(() => {
        // cek ref
        if (selectRef.current) {

            // initialize select target 
            const selectTarget = selectRef.current;


            // handle click 
            const handleClickOutside = (e: MouseEvent): void => {
                // cek target 
                if (selectTarget && !selectTarget.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            }

            // add event listener
            document.addEventListener('click', handleClickOutside);

            // remove event listener
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [selectRef]);


    // select type content
    const selectTypeContent: { label: 'video' | 'text', value: 'video' | 'text' }[] = [
        {
            label: 'video',
            value: 'video'
        }, {
            label: 'text',
            value: 'text'
        }
    ]



    return (
        <div className='w-full flex flex-col justify-start items-start'>

            {/* label text  */}
            <label htmlFor='' className='text-black font-semibold capitalize mb-2'>
                {label}
            </label>



            {/* box input */}
            <div className={clsx(
                'w-full border border-slate-300 rounded-full py-3 px-5 flex flex-row justify-between items-center transition-all duration-200 relative ',
                error?.message ? 'ring-1 ring-red-500' : 'focus-within:ring-1 focus-within:ring-blue-primary'
            )} onClick={handleOpenModal}>
                {/* select */}

                <div className='w-full flex flex-row justify-start items-center gap-3'>

                    {/* label icon */}
                    <label htmlFor='name'>
                        <img src={crown} className='w-6.5' alt='icon' loading='lazy' />
                    </label>

                    {/* input */}
                    <input
                        {...register}
                        id={name}
                        name={name}
                        aria-invalid={!!error}
                        value={valueSelect}
                        readOnly
                        className='w-full outline-none bg-transparent font-semibold placeholder:text-slate-400 placeholder:font-semibold placeholder:text-sm capitalize cursor-pointer'
                        placeholder='Select type content'
                    />

                    {/* icon arrow */}
                    <button type='button' className='h-full' onClick={handleOpenModal}>
                        <img src={arrow} alt="arrow" className='w-6' loading="lazy" />
                    </button>

                    {/* modal select */}
                    <ModalSelect choose={[{ label: 'video', value: 'video' }, { label: 'text', value: 'text' }]} isOpen={isOpen} handleSelect={handleSelect} setValueSelect={setValueSelect} select={selectTypeContent} />
                </div>
            </div>

            {/* error */}
            <ErrorMessage error={error} />

        </div>
    )
}

export default SelectTypeContent
