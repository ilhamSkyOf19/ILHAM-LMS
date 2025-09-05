import { type FC } from 'react'
import TitleContentDashboard from '../../../../fragments/TitleContentDashboard'
import BoxInputData from '../../../../components/BoxInputData'
import { useForm, type FieldError } from 'react-hook-form'


// icons 
import noteFavorite from '../../../../assets/images/icons/note-favorite-black.svg'
import bill from '../../../../assets/images/icons/bill-black.svg'
import ButtonBlue from '../../../../components/ButtonBlue'
import BoxInputThumbnail from '../../../../components/BoxInputThumbnail'
import CategoryInput from '../../../../components/CategoryInput'
import BoxInputTextArea from '../../../../components/BoxInputTextArea'


const NewCourse: FC = () => {


    // use hook form 
    const { handleSubmit, register, formState: { errors }, setValue, clearErrors } = useForm({

    });


    // handle on submit 
    const onSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <div className='w-full flex flex-col justify-start items-start gap-4 pb-12'>
            {/* header */}
            <TitleContentDashboard title='New Course' desc='Create new future for company'>
                {null}
            </TitleContentDashboard>


            {/* form input */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] rounded-2xl bg-white-secondary p-8'>
                {/* name */}
                <BoxInputData
                    icon={noteFavorite}
                    type='text'
                    name='name'
                    placeholder='Write better name for your course'
                    label='course name'
                    register={register('name', { required: "Input tidak boleh kosong" })}
                    error={errors.name as FieldError}
                />

                {/* thumbnail */}
                <BoxInputThumbnail
                    register={register('thumbnail', { required: "Input tidak boleh kosong" })}
                    setValue={setValue}
                    error={errors.thumbnail as FieldError}
                    clearErrors={clearErrors}
                />

                {/* tagline */}
                <BoxInputData
                    icon={bill}
                    type='text'
                    name='tagline'
                    placeholder='Write better tagline for your course'
                    label='Course Tagline'
                    register={register('tagline', { required: "Input tidak boleh kosong" })}
                    error={errors.tagline as FieldError}
                />

                {/* category */}
                <CategoryInput
                    icon={bill}
                    type='text'
                    name='category'
                    placeholder='Choose one category'
                    label='Course Category'
                    register={register('category', { required: "Input tidak boleh kosong" })}
                    error={errors.category as FieldError}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />


                {/* text area */}
                <BoxInputTextArea
                    register={register('description', { required: "Input tidak boleh kosong" })}
                    error={errors.description as FieldError}
                />


                {/* button submit */}
                <div className='w-full mt-2'>
                    <ButtonBlue type='submit' label='new course' />
                </div>
            </form>

        </div>
    )
}

export default NewCourse
