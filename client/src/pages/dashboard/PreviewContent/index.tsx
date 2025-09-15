import { useState, type FC } from 'react'
import SideBarPreviewContent from '../../../components/SidebarPreviewContent'
import { useLoaderData } from 'react-router-dom';
import type { ContentResponse } from '../../../models/content-model';
import type { CourseModel } from '../../../models/course-model';
import type { ResponseData } from '../../../types/types';




const PreviewContent: FC = () => {
    // initialize course
    const courses = useLoaderData() as ResponseData<CourseModel>;

    console.log(courses);

    // initialize course
    const course: CourseModel | null = courses?.success ? courses.data : null;

    // initialize contents
    const contents: ContentResponse[] | [] = course ? course.contents : [];


    // state contents 
    const [contentsDetail, setContentsDetail] = useState<ContentResponse>(contents[0] as ContentResponse);




    // handle cotent
    const handleContent = (index: number) => {
        setContentsDetail(contents[index]);
    }


    return (
        <div className='w-full flex flex-row justify-start items-start py-2 px-2'>

            {/* sidebar preview */}
            <div className='w-[27rem]'>
                <SideBarPreviewContent thumbnail={course?.url_thumbnail ?? ''} name={course?.name ?? ''} contents={course?.contents as ContentResponse[] ?? []} handleContent={handleContent} />
            </div>

            {/* content */}
            <div className='w-full flex flex-col justify-start items-start'>
                {
                    contentsDetail ? (
                        contentsDetail.type === 'video' ? (
                            <p>{contentsDetail.videoId}</p>
                        ) : (
                            <p>{contentsDetail.text}</p>
                        )
                    ) : (
                        <p>no content</p>
                    )

                }
            </div>

        </div>
    )
}

export default PreviewContent
