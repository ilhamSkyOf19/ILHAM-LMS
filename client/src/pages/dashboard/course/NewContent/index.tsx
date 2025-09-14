

import { useState, type FC } from 'react'
import LinkNavigation from '../../../../components/LinkNavigation'
import type { LinkType, ResponseData } from '../../../../types/types'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { ContentResponse, CreateContentModel, UpdateContentModel } from '../../../../models/content-model'


// icons 
import noteFavorite from '../../../../assets/images/icons/note-favorite-black.svg'
import BoxInputData from '../../../../components/BoxInputData'
import SelectTypeContent from '../../../../components/SelectTypeContent'
import ButtonBlue from '../../../../components/ButtonBlue'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContentValidation } from '../../../../validations/content-validation'
import { ContentService } from '../../../../services/content.service'
import { AxiosError } from 'axios'


type Props = {
    typeContent: 'edit' | 'new'
}


const NewContent: FC<Props> = ({ typeContent }) => {

    // use loader 
    const doc = useLoaderData() as { content: ResponseData<ContentResponse> };


    // initial doc 
    const content = doc && doc.content.success ? doc.content.data : null;


    // navigate 
    const navigate = useNavigate();

    // get params 
    const { id: id_course } = useParams() as { id: string };

    // type 
    const [type, setType] = useState<CreateContentModel['type']>(content?.type ?? 'video');




    // use hook form 
    const { register, handleSubmit, formState: { errors }, clearErrors, setValue, setError } = useForm<
        CreateContentModel | UpdateContentModel
    >({
        defaultValues: typeContent === "edit" && content
            ? {
                // 🔹 ini untuk UPDATE
                title: content.title ?? "",
                type: content.type ?? "video",
                text: content.text ?? "",
                videoId: content.videoId ?? "",
            }
            : {
                // 🔹 ini untuk CREATE
                title: "",
                type: "video",
                text: "",
                videoId: "",
            },
        resolver: zodResolver(
            typeContent === "edit"
                ? ContentValidation.UPDATE
                : ContentValidation.CREATE
        ),
    });




    // mutate
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: CreateContentModel | UpdateContentModel) => {
            if (typeContent === "new" && !content) {
                return await ContentService.create(id_course, data as CreateContentModel);
            } else {
                return await ContentService.update(content?._id ?? "", data as UpdateContentModel);
            }
        },
        onError: (error) => {
            // error axios
            if (error instanceof AxiosError) {
                console.log('error', error.response?.data);
                // set error type 
                setError('type', { message: error.response?.data.message });

                // set error text or video
                if (type === 'text') {
                    setError('text', { message: error.response?.data.message });
                } else {
                    setError('videoId', { message: error.response?.data.message });
                }
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
    const onSubmit = async (data: CreateContentModel | UpdateContentModel) => {
        try {
            // cek data 
            if (typeContent === 'new' && !data) {
                return
            }

            // cek match type and video or text 
            // if (data.type !== content?.type) {
            //     if (data.type === 'video' && !data.videoId && content?.type === 'text') {
            //         return setError('videoId', { message: 'video id is required' });

            //     } else if (data.type === 'text' && !data.text && content?.type === 'video') {
            //         return setError('text', { message: 'text is required' });
            //     }
            // } else {
            //     if (data.type === 'video' && !data.videoId) {
            //         data?.videoId === content?.videoId
            //     } else {
            //         data?.text === content?.text
            //     }
            // }





            // mutate
            (typeContent === 'new' && !content) ? await mutateAsync(data as CreateContentModel) : await mutateAsync(data as UpdateContentModel);


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
                        type={type}
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
