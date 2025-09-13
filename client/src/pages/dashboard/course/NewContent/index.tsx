

import { useState, type FC } from 'react'
import LinkNavigation from '../../../../components/LinkNavigation'
import type { LinkType } from '../../../../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { CreateContentModel } from '../../../../models/content-model'


// icons 
import noteFavorite from '../../../../assets/images/icons/note-favorite-black.svg'
import BoxInputData from '../../../../components/BoxInputData'
import SelectTypeContent from '../../../../components/SelectTypeContent'
import ButtonBlue from '../../../../components/ButtonBlue'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContentValidation } from '../../../../validations/content-validation'
import { ContentService } from '../../../../services/content.service'

const NewContent: FC = () => {

    // navigate 
    const navigate = useNavigate();

    // get params 
    const { id: id_course } = useParams() as { id: string };

    // type 
    const [type, setType] = useState<CreateContentModel['type']>('video');


    // use hook form 
    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<CreateContentModel>({
        defaultValues: {
            type: 'video',
        },
        resolver: zodResolver(ContentValidation.CREATE),
    })


    // mutate
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: CreateContentModel) => ContentService.create(id_course, data),
        onError: (error) => {
            // error axios
            if (error instanceof Error) {
                console.log(error);
            } else {
                console.log(error);
            }
        },
        onSuccess: (response) => {
            // redirect
            navigate(`/dashboard/courses/course-detail/${id_course}`);
            console.log(response);
        }
    });


    // handle on submit
    const onSubmit = async (data: CreateContentModel) => {
        try {
            // cek data 
            if (!data) {
                return
            }

            // mutate
            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }


    }



    // link navigation
    const linkNavigation: LinkType[] = [
        {
            link: '/dashboard/courses',
            label: 'courses'
        },
        {
            link: `/dashboard/courses/course-detail/${id_course}`,
            label: 'course detail'
        },
        {
            link: `/dashboard/courses/course-detail/${id_course}/new-content`,
            label: 'new content'
        }
    ]
    return (
        <div className='w-full flex flex-col justify-start items-start gap-8 pb-12'>
            {/* link navigation */}
            <LinkNavigation data={linkNavigation} />

            {/* header content */}
            <div className='w-full flex flex-row justify-start items-center gap-8'>
                {/* thumbnail */}
                <div className='w-[10rem] h-[8rem] rounded-3xl overflow-hidden'>
                    <img src="/thumbnails/th-2.png" alt="thumbnail" className='w-full h-full object-cover' loading='lazy' />
                </div>

                {/* title content */}
                <div className='flex flex-col justify-start items-start gap-1'>
                    <h1 className='text-black text-3xl font-extrabold capitalize'>add content</h1>
                    {/* description */}
                    <p className='text-slate-400 text-base font-normal'>Give a best content for the course</p>
                </div>
            </div>


            {/* form content */}
            <div className='w-full p-8 rounded-2xl bg-white-secondary'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start'>
                    {/* title */}
                    <BoxInputData
                        label='content title'
                        type='text'
                        placeholder='Title'
                        register={register('title')}
                        error={errors?.title}
                        name='title'
                        icon={noteFavorite}
                    />

                    {/* select type */}
                    <SelectTypeContent
                        label='type'
                        register={register('type')}
                        error={errors?.type}
                        name='type'
                        setValue={setValue}
                        clearErrors={clearErrors}
                        setType={setType}
                    />

                    {
                        type === 'video' ? (
                            // video id
                            <BoxInputData
                                label='video id'
                                type='text'
                                placeholder='Video ID'
                                register={register('videoId')}
                                error={errors?.videoId}
                                name='videoId'
                                icon={noteFavorite}
                            />
                        ) : type === 'text' ? (
                            // text
                            <BoxInputData
                                label='text'
                                type='text'
                                placeholder='Text'
                                register={register('text')}
                                error={errors?.text}
                                name='text'
                                icon={noteFavorite}
                            />
                        ) : (
                            null
                        )
                    }

                    {/* button submit  */}
                    <div className='mt-4 w-full'>
                        <ButtonBlue label='submit' type='submit' disabled={isPending} />
                    </div>

                </form>
            </div>


        </div>
    )
}

export default NewContent
