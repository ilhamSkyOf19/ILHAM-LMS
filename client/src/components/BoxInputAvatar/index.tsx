import { useRef, useState, type ChangeEvent, type FC } from 'react'
import type { FieldError, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import type { Student } from '../../types/types';
import ButtonTrash from '../ButtonTrash';



// icon
import avatarIcon from '../../assets/images/icons/gallery-add-black.svg';
import ErrorMessage from '../ErrorMessage';
import clsx from 'clsx';

type Props = {
    setValue: UseFormSetValue<Student>;
    error?: FieldError;
    register: UseFormRegisterReturn
    clearErrors: UseFormClearErrors<Student>
}

const BoxInputAvatar: FC<Props> = ({ setValue, error, register, clearErrors }) => {

    // state preview 
    const [preview, setPreview] = useState<string | undefined>(undefined);


    // ref input avatar
    const inputRef = useRef<HTMLInputElement>(null);



    // handle onchange
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // cek file
        const file = e.target.files;

        if (file && file.length > 0) {
            // clear error
            clearErrors('avatar');
            // sek preview 
            const urlImg = URL.createObjectURL(file[0]);
            setPreview(urlImg);
            // set value
            setValue('avatar', file[0]);
        }
    }


    // handle reset 
    const handleResetAvatar = (): void => {
        if (inputRef.current) {
            inputRef.current.value = '';

            // set preview
            setPreview(undefined);
            // set value
            setValue('avatar', null);
        }
    }


    return (
        <div className='w-full flex flex-col justify-start items-start'>
            {/* label */}
            <label htmlFor='avatar' className='text-black font-semibold mb-2'>
                Add a Avatar
            </label>


            {/* input */}
            <input
                {...register}
                ref={inputRef}
                type='file'
                accept='image/*'
                id='avatar'
                hidden={true}
                onChange={handleOnChange}
            />

            <div className='w-full flex flex-row justify-start items-center gap-4 relative'>
                {/* box input avatar */}
                <div className={clsx(
                    'w-[5.5rem] h-[5.5rem] rounded-2xl border border-slate-300 flex flex-col justify-center items-center relative overflow-hidden cursor-pointer',
                    error && 'ring-1 ring-red-500'
                )} onClick={() => inputRef.current?.click()}>
                    {/* icon  */}
                    <img src={avatarIcon} alt='icon' className='w-6.5' loading='lazy' />

                    {/* preview */}
                    {
                        preview && (
                            <img src={preview} alt='preview' className='w-full h-full object-cover absolute' loading='lazy' />
                        )
                    }
                </div>

                {/* button trash */}
                {
                    preview && (
                        <ButtonTrash handleClick={handleResetAvatar} />
                    )
                }
            </div>

            {/* error messsage  */}
            <ErrorMessage error={error} />
        </div>
    )
}

export default BoxInputAvatar
