import { useState, type FC } from 'react'
import SideBarPreviewContent from '../../../components/SidebarPreviewContent'
import { useLoaderData } from 'react-router-dom';
import type { CourseModelTry } from '../../../models/course-model';
import type { ContentResponse } from '../../../models/content-model';




const PreviewContent: FC = () => {
    // initialize course
    const courses = useLoaderData() as CourseModelTry;


    // state contents 
    const [contents, setContents] = useState<ContentResponse>(courses?.contents[0] as ContentResponse);




    // handle cotent
    const handleContent = (index: number) => {
        setContents(courses?.contents[index - 1] as ContentResponse);
    }


    return (
        <div className='w-full flex flex-row justify-start items-start py-2 px-2'>

            {/* sidebar preview */}
            <div className='w-[27rem]'>
                <SideBarPreviewContent thumbnail={courses?.url_thumbnail} name={courses?.name} contents={courses?.contents as ContentResponse[]} handleContent={handleContent} />
            </div>

            {/* content */}
            <div className='w-full flex flex-col justify-start items-start'>
                {
                    contents ? (
                        contents.type === 'video' ? (
                            <p>{contents.videoId}</p>
                        ) : (
                            <p>{contents.text}</p>
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
