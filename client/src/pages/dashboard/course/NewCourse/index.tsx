import { type FC } from 'react'
import TitleContentDashboard from '../../../../fragments/TitleContentDashboard'
import BoxInputData from '../../../../components/BoxInputData'
import { useForm } from 'react-hook-form'


// icons 
import noteFavorite from '../../../../assets/images/icons/note-favorite-black.svg'
import bill from '../../../../assets/images/icons/bill-black.svg'
import ButtonBlue from '../../../../components/ButtonBlue'
import BoxInputThumbnail from '../../../../components/BoxInputThumbnail'
import CategoryInput from '../../../../components/CategoryInput'
import BoxInputTextArea from '../../../../components/BoxInputTextArea'
import { useLoaderData } from 'react-router-dom'
import sweetAlertNotiifNotUpdate from '../../../../components/SweetAlertNotifNotUpdate'


type CourseForm = {
    name: string;
    thumbnail: File | null;
    tagline: string;
    category: string;
    description: string;
};


type Props = {
    typeContent: 'edit' | 'new'
}

const NewCourse: FC<Props> = ({ typeContent }) => {

    // use loader data
    const course = useLoaderData();

    // use hook form 
    const { handleSubmit, register, formState: { errors }, setValue, clearErrors } = useForm<CourseForm>({
        defaultValues: {
            name: course?.name || '',
            thumbnail: course?.thumbnail || null,
            tagline: course?.tagline || '',
            category: course?.category.toLowerCase() || '',
            description: course?.description || '',
        }
    });


    // handle on submit 
    const onSubmit = (data: any) => {
        if (typeContent === 'edit' && (!data.name && !data.thumbnail && !data.tagline && (data.category === (course?.category).toLowerCase()) && !data.description)) {
            sweetAlertNotiifNotUpdate();
            return;
        }
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
                    register={register('name', typeContent === 'edit' ? {} : { required: "Input tidak boleh kosong" })}
                    error={errors?.name}
                />

                {/* thumbnail */}
                <BoxInputThumbnail
                    register={register('thumbnail', typeContent === 'edit' ? {} : { required: "Input tidak boleh kosong" })}
                    setValue={setValue}
                    error={errors?.thumbnail}
                    clearErrors={clearErrors}
                    previewEdit={
                        typeContent === 'edit' ? `/thumbnails/${course?.thumbnail}` : undefined
                    }
                />

                {/* tagline */}
                <BoxInputData
                    icon={bill}
                    type='text'
                    name='tagline'
                    placeholder='Write better tagline for your course'
                    label='Course Tagline'
                    register={register('tagline', typeContent === 'edit' ? {} : { required: "Input tidak boleh kosong" })}
                    error={errors?.tagline}
                />

                {/* category */}
                <CategoryInput
                    icon={bill}
                    type='text'
                    name='category'
                    placeholder='Choose one category'
                    label='Course Category'
                    register={register('category', typeContent === 'edit' ? {} : { required: "Input tidak boleh kosong" })}
                    error={errors?.category}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />


                {/* text area */}
                <BoxInputTextArea
                    register={register('description', typeContent === 'edit' ? {} : { required: "Input tidak boleh kosong" })}
                    error={errors?.description}
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
