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
import { useLoaderData, useNavigate } from 'react-router-dom'
import sweetAlertNotiifNotUpdate from '../../../../components/SweetAlertNotifNotUpdate'
import type { ResponseData } from '../../../../types/types'
import type { CourseModel, CreateCourseModel } from '../../../../models/course-model'
import { useMutation } from '@tanstack/react-query'
import { CourseService } from '../../../../services/course.service'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseValidation } from '../../../../validations/course-validation'
import BoxInputPrice from '../../../../components/BoxInputPrice'
import type { CategoryOriginalResponse } from '../../../../models/category-model'




type Props = {
    typeContent: 'edit' | 'new'
}

const NewCourse: FC<Props> = ({ typeContent }) => {

    // use loader data
    const doc = useLoaderData() as { course?: ResponseData<CourseModel>; categories: ResponseData<CategoryOriginalResponse[]> };

    const data = doc.course ? doc.course : null;
    const category = (doc.categories && doc.categories.success) ? doc.categories.data : [];



    // get course 
    const course: CourseModel | null = (data && data.success) ? data.data : null;

    // navigate 
    const navigate = useNavigate();

    // use hook form 
    const { handleSubmit, register, formState: { errors }, setValue, clearErrors, resetField, control } = useForm<CreateCourseModel>({
        defaultValues: {
            name: course?.name || '',
            tagline: course?.tagline || '',
            category: course?.category.name.toLowerCase() || '',
            description: course?.description || '',
        },
        resolver: zodResolver(CourseValidation.CREATE)
    });


    // mutate 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: FormData) => CourseService.create(data),
        onSuccess: (response: ResponseData<CourseModel>) => {
            if (response.success) {
                console.log(response.data);

                // reset form 
                resetField('name');
                resetField('tagline');
                resetField('category');
                resetField('description');
                resetField('thumbnail');

                // navigate
                navigate(`/dashboard/courses`);
            } else {
                console.log(response.message);
            }
        },
        onError: (error: unknown) => {
            // error axios 
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }

            // other 
            console.log(error);
        }
    })


    // handle on submit 
    const onSubmit = async (data: CreateCourseModel) => {
        try {
            if (typeContent === 'edit' && (!data.name && !data.thumbnail && !data.tagline && (data.category === (course?.category.name || '').toLowerCase()) && !data.description)) {
                sweetAlertNotiifNotUpdate();
                return;
            }

            if (!data) return;

            //    form data
            const formData = new FormData();

            // name 
            formData.append('name', data.name);

            // tagline 
            formData.append('tagline', data.tagline);

            // category 
            formData.append('category', data.category);

            // description 
            formData.append('description', data.description);

            // thumbnail
            formData.append('thumbnail', data.thumbnail);

            // price 
            formData.append('price', data.price.toString());

            // request 
            await mutateAsync(formData);


        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className='w-full flex flex-col justify-start items-start gap-4 pb-12'>
            {/* header */}
            <TitleContentDashboard title='New Course' desc='Create new future for company'>
                {null}
            </TitleContentDashboard>


            {/* form input */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] rounded-2xl bg-white-secondary p-8 flex flex-col justify-start items-start gap-1'>
                {/* name */}
                <BoxInputData
                    icon={noteFavorite}
                    type='text'
                    name='name'
                    placeholder='Write better name for your course'
                    label='course name'
                    register={register('name')}
                    error={errors?.name}
                />

                {/* thumbnail */}
                <BoxInputThumbnail
                    register={register('thumbnail')}
                    setValue={setValue}
                    resetField={resetField}
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
                    register={register('tagline')}
                    error={errors?.tagline}
                />

                {/* category */}
                <CategoryInput
                    icon={bill}
                    type='text'
                    name='category'
                    placeholder='Choose one category'
                    label='Course Category'
                    register={register('category')}
                    error={errors?.category}
                    category={category}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                {/* price */}
                <BoxInputPrice
                    name='price'
                    placeholder='Write better price for your course'
                    label='Course Price'
                    control={control}
                    error={errors?.price}
                    icon={bill}
                />


                {/* text area */}
                <BoxInputTextArea
                    register={register('description')}
                    error={errors?.description}
                />


                {/* button submit */}
                <div className='w-full mt-2'>
                    <ButtonBlue type='submit' label='new course' disabled={isPending} />
                </div>
            </form>

        </div>
    )
}

export default NewCourse
