import { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react'
import icon from '../../assets/images/icons/gallery-add-black.svg'
import ButtonTrash from '../ButtonTrash';
import type { FieldError, UseFormClearErrors, UseFormRegisterReturn, UseFormResetField, UseFormSetValue } from 'react-hook-form';
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage';
import type { CreateCourseModel, UpdateCourseModel } from '../../models/course-model';
type CourseForm = {
    name: string;
    thumbnail: File | null;
    tagline: string;
    category: string;
    description: string;
};

type Props = {
    setValue: UseFormSetValue<CreateCourseModel | UpdateCourseModel>;
    error?: FieldError;
    register: UseFormRegisterReturn;
    clearErrors: UseFormClearErrors<CourseForm>;
    previewEdit?: string;
    resetField: UseFormResetField<CreateCourseModel | UpdateCourseModel>;
}
const BoxInputThumbnail: FC<Props> = ({ previewEdit, setValue, error, register, clearErrors, resetField }) => {


    // state preview
    const [preview, setPreview] = useState<string | undefined>(undefined)

    // input ref
    const inputRef = useRef<HTMLInputElement>(null);


    // handle file change 
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // file
        const file = e.target.files;

        if (file && file.length > 0) {
            // set error 
            clearErrors('thumbnail');

            // get url file
            const fileURL: string = URL.createObjectURL(file[0]);

            // set preview
            setPreview(fileURL);

            // set value
            setValue('thumbnail', file[0]);
        }
    };


    // handle reset preview
    const handleResetPreview = (): void => {
        if (inputRef.current) {
            inputRef.current.value = '';
            // set preview
            setPreview(undefined);
            // set value
            resetField('thumbnail');
        }
    };



    // set preview edit
    useEffect(() => {
        if (previewEdit) {
            setPreview(previewEdit)
        } else {
            setPreview(undefined)
        }
    }, [previewEdit])





    return (
        <div className='w-full flex flex-col justify-start items-start'>
            {/* label */}
            <label htmlFor='thumbnail' className='text-black font-semibold capitalize mb-2'>
                Add a Thumbnail
            </label>

            {/* input thumbnail */}
            <input
                {...register}
                ref={inputRef}
                id='thumbnail'
                type='file'
                accept='image/*'
                name='thumbnail'
                className='hidden'
                onChange={handleFileChange}
            />

            {/* box */}
            <div className={clsx(
                'w-full h-[15rem] rounded-3xl border border-slate-200 flex flex-row justify-center items-center relative overflow-hidden ',
                error && 'ring-1 ring-red-500'
            )}>
                <div className='w-full h-full flex flex-row justify-center items-center gap-3 cursor-pointer' onClick={() => inputRef.current?.click()}>
                    {/* icon */}
                    <img src={icon} className='w-6' alt="icon" loading='lazy' />

                    {/* placeholder */}
                    <p className='text-slate-400'>Add an attachment</p>
                </div>

                {/* preview */}
                {
                    preview && typeof preview === 'string' ? (
                        <div className='w-full h-full flex flex-row justify-center items-center absolute'>
                            <img src={preview} alt="preview" className='w-full h-full object-cover object-center' />

                            {/* delete preview */}
                            <div className='absolute bottom-2 right-4 z-10'>
                                <ButtonTrash handleClick={handleResetPreview} />
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
            </div>


            {/* error */}
            <ErrorMessage error={error} />

        </div>
    )
}

export default BoxInputThumbnail
