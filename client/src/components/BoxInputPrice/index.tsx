import { type FC } from 'react'
import { Controller, type Control, type FieldError } from 'react-hook-form';
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage';
import type { CreateCourseModel, UpdateCourseModel } from '../../models/course-model';




type Props = {
    name: keyof CreateCourseModel;
    placeholder: string;
    label: string;
    icon: string;
    error?: FieldError;
    control?: Control<CreateCourseModel | UpdateCourseModel>
    value?: number
}



const BoxInputPrice: FC<Props> = ({ name, placeholder, label, error, icon, control, value }) => {


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
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        const formatNumber = (val: string) => {
                            if (!val) return "";
                            return new Intl.NumberFormat("id-ID").format(Number(val));
                        };

                        return (
                            <input
                                type="text"
                                value={value ? formatNumber(value.toString()) : field.value ? formatNumber(field.value.toString()) : ""}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/\D/g, ""); // simpan angka mentah
                                    field.onChange(raw);
                                }}
                                placeholder={placeholder}
                                className='w-full outline-none text-black font-semibold placeholder:font-normal placeholder:text-slate-400'
                            />
                        );
                    }}
                />




            </div>

            {/* error message */}
            <ErrorMessage error={error} />
        </div>
    )
}

export default BoxInputPrice
