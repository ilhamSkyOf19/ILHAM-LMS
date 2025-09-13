import { useState, type FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import type { LinkType, ResponseData } from '../../../../types/types';
import LinkNavigation from '../../../../components/LinkNavigation';
import TitleContentDashboard from '../../../../fragments/TitleContentDashboard';
import LinkButtonBorder from '../../../../components/LinkButtonBorder';
import LinkButtonBlue from '../../../../components/LinkButtonBlue';


// thumb 
import thumb from '../../../../assets/images/thumbnails/th-4.png'
import DataCourseCard from '../../../../components/DataCourseCard';
import iconUser from '../../../../assets/images/icons/profile-2user-purple.svg'
import crownPurple from '../../../../assets/images/icons/crown-purple.svg'
import notePurple from '../../../../assets/images/icons/note-favorite-purple.svg'
import cupPurple from '../../../../assets/images/icons/cup-purple.svg'
import CourseContentCard from '../../../../components/CourseContentCard';
import ButtonPagination from '../../../../components/ButtonPagination';
import type { CourseModel } from '../../../../models/course-model';
import type { ContentResponse } from '../../../../models/content-model';






const CourseDetail: FC = () => {

    // loader 
    const doc = useLoaderData() as {
        course: ResponseData<CourseModel>,
        contents: ResponseData<ContentResponse[]>;
    };

    // course
    const course: CourseModel | null = doc.course.success ? doc.course.data : null;

    // contents
    const contents: ContentResponse[] | null = doc.contents.success ? doc.contents.data : null;



    console.log(contents)

    // state active 
    const [active, setActive] = useState<number>(1);


    // handle active 
    const handleActive = (number: number): void => {
        setActive(number + 1);
    }

    // link navigation
    const linkNavigation: LinkType[] = [
        {
            link: '/dashboard',
            label: 'dashboard'
        },
        {
            link: '/dashboard/courses',
            label: 'courses'
        },
        {
            link: `/dashboard/courses/course-detail/${course?._id}`,
            label: 'course detail'
        }
    ]

    return (
        <div className='w-full h-full flex flex-col justify-start items-start gap-8 pb-12'>
            {/* link navigation */}
            <LinkNavigation data={linkNavigation} />


            {/* header content */}
            <TitleContentDashboard title={course?.name ?? ''} >
                {/* button edit */}
                <LinkButtonBorder link={`/dashboard/courses/course-detail/${course?._id}/edit-course`} label='edit course' />

                {/* button review */}
                <LinkButtonBlue link={`/dashboard/courses/course-detail/${course?._id}/preview`} label='preview' />
            </TitleContentDashboard>


            {/* overview course */}
            <div className='w-full h-[16rem] flex flex-row justify-between items-start'>
                {/* thumb overview */}
                <div className='flex-1 h-full rounded-2xl overflow-hidden group'>
                    <img src={thumb} alt='thumbnail' className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' loading='lazy' />
                </div>

                {/* statistik */}
                <div className='flex-1 h-full flex flex-col justify-between items-start gap-5'>
                    {/* statistik 1 */}
                    <div className='w-full h-full flex flex-row justify-between items-center gap-8 pl-12'>
                        {/* card statistik */}
                        <DataCourseCard icon={iconUser} label={`${(0).toLocaleString('en-US')} students`} />
                        {/* card statistik */}
                        <DataCourseCard icon={crownPurple} label={course?.category?.name ?? ''} />
                    </div>
                    {/* statistik 2 */}
                    <div className='w-full h-full flex flex-row justify-between items-center gap-8 pl-12'>
                        {/* card statistik */}
                        <DataCourseCard icon={notePurple} label={`${(course?.contents.length ?? []).toLocaleString('en-US')} Content`} />
                        {/* card statistik */}
                        <DataCourseCard icon={cupPurple} label={`${true ? 'certificate' : 'Not Certified'}`} />
                    </div>
                </div>
            </div>


            {/* course content */}
            <div className='w-full flex flex-col justify-start items-start py-6 px-6 bg-white-secondary rounded-2xl gap-6'>
                {/* header */}
                <div className='w-full flex flex-row justify-between items-center'>
                    <h1 className='text-2xl text-black font-bold capitalize'>course content</h1>

                    {/* button add content */}
                    <LinkButtonBlue link={`/dashboard/courses/course-detail/${course?._id}/new-content`} label='add content' />

                </div>
                {/* content */}
                <div className='w-full flex flex-col justify-start items-start gap-8'>
                    {
                        contents && contents.length > 0 ? (
                            contents.map((content: ContentResponse, index: number) => (
                                <CourseContentCard key={index} content={content} number={`${index + 1}`} idCourse={course?._id ?? ''} />

                            ))
                        ) : (
                            <div className='w-full flex flex-row justify-center items-center'>

                                <p className='text-slate-400 text-center text-lg'>No Content</p>
                            </div>
                        )

                    }
                </div>

                {/* pagination */}
                <div className='w-full flex flex-row justify-start items-center gap-3'>
                    {
                        course && (
                            course.contents.length > 0 && (
                                [1, 2, 3, 4, 5].map((_, index: number) => (
                                    <ButtonPagination key={index} number={index + 1} handleClick={() => handleActive(index)} active={active === index + 1} />
                                ))

                            )
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default CourseDetail
