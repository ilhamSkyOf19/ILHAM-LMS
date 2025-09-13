import clsx from 'clsx';
import { useEffect, useRef, useState, type FC } from 'react'
import type { FieldError, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

import arrow from '../../assets/images/icons/arrow-down.svg'
import ErrorMessage from '../ErrorMessage';
import type { CreateCourseModel, UpdateCourseModel } from '../../models/course-model';
import type { CategoryOriginalResponse } from '../../models/category-model';
import ModalSelect from '../ModalSelect';


type Props = {
    type: 'text' | 'password' | 'email';
    name: string;
    placeholder: string;
    label: string;
    icon: string;
    register: UseFormRegisterReturn;
    setValue: UseFormSetValue<CreateCourseModel | UpdateCourseModel>;
    error?: FieldError;
    clearErrors: UseFormClearErrors<CreateCourseModel | UpdateCourseModel>
    category: CategoryOriginalResponse[]
    previewValue?: string;
}

const CategoryInput: FC<Props> = ({ type, name, placeholder, label, register, error, icon, setValue, clearErrors, category, previewValue }) => {

    // state modal choose
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // set value choose
    const [valueChoose, setValueChoose] = useState<string>('');

    // ref choose & modal choose
    const chooseRef = useRef<HTMLDivElement>(null);
    // const modalRef = useRef<HTMLDivElement>(null);


    // handle open modal choose
    const handleOpenModal = (): void => setIsOpen(!isOpen);

    // handle choose 
    const handleChoose = (value: string): void => {
        clearErrors('category');
        setValue('category', value);
        setValueChoose(value);
    }


    // handle click outside 
    useEffect(() => {
        if (chooseRef.current) {
            const chooseTarget = chooseRef.current;
            const handleClickOutside = (event: MouseEvent): void => {
                if (chooseTarget && !chooseTarget.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        }
    }, [chooseRef]);


    // data choose
    const choose: { label: string, value: string }[] = category.map(item => ({
        label: item.name,
        value: item._id
    }));

    // handle preview value 
    useEffect(() => {
        if (previewValue) {
            setValueChoose(previewValue);
        }
    }, [previewValue]);



    return (
        <div className='w-full flex flex-col justify-start items-start'>
            {/* label text */}
            <label htmlFor='name' className='text-black font-semibold capitalize mb-2'>
                {label}
            </label>

            {/* box input */}
            <div ref={chooseRef} className={clsx(
                'w-full border border-slate-300 rounded-full py-3 px-5 flex flex-row justify-between items-center transition-all duration-200 relative',
                error?.message ? 'ring-1 ring-red-500' : 'focus-within:ring-1 focus-within:ring-blue-primary'
            )} onClick={handleOpenModal}>
                <div className='w-full flex flex-row justify-start items-center gap-3'>
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
                        value={valueChoose}
                        readOnly
                        className='w-full outline-none text-black font-semibold placeholder:font-semibold placeholder:text-black cursor-pointer capitalize'
                        placeholder={placeholder}

                    />
                </div>

                {/* icon arrow */}
                <button type='button' className='h-full'>
                    <img src={arrow} className='w-6' alt="icon" loading='lazy' />
                </button>


                {/* choose */}
                <ModalSelect choose={choose} isOpen={isOpen} handleChoose={handleChoose} setValueChoose={setValueChoose} />
            </div>

            {/* error message */}
            <ErrorMessage error={error} />
        </div>
    )
}

export default CategoryInput
