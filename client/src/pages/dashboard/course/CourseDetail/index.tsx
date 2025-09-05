import { useState, type FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import type { LinkType } from '../../../../types/types';
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






const CourseDetail: FC = () => {

    // loader 
    const course = useLoaderData();

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
            link: `/dashboard/courses/course-detail/${course.id}`,
            label: 'course detail'
        }
    ]

    return (
        <div className='w-full h-full flex flex-col justify-start items-start gap-8 pb-12'>
            {/* link navigation */}
            <LinkNavigation data={linkNavigation} />


            {/* header content */}
            <TitleContentDashboard title='Mastering React TypeScript 7 Website Development' >
                {/* button edit */}
                <LinkButtonBorder link={`/dashboard/courses/detail-course/${course.id}/edit-course`} label='edit course' />

                {/* button review */}
                <LinkButtonBlue link={`/dashboard/courses/detail-course/${course.id}/preview`} label='preview' />
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
                        <DataCourseCard icon={iconUser} label={`${(course.total_students).toLocaleString('en-US')} students`} />
                        {/* card statistik */}
                        <DataCourseCard icon={crownPurple} label={course.category} />
                    </div>
                    {/* statistik 2 */}
                    <div className='w-full h-full flex flex-row justify-between items-center gap-8 pl-12'>
                        {/* card statistik */}
                        <DataCourseCard icon={notePurple} label={`${(course.content.length).toLocaleString('en-US')} Content`} />
                        {/* card statistik */}
                        <DataCourseCard icon={cupPurple} label={`${course.certificate ? 'certificate' : 'Not Certified'}`} />
                    </div>
                </div>
            </div>


            {/* course content */}
            <div className='w-full flex flex-col justify-start items-start py-6 px-6 bg-white-secondary rounded-2xl gap-6'>
                {/* header */}
                <div className='w-full flex flex-row justify-between items-center'>
                    <h1 className='text-2xl text-black font-bold capitalize'>course content</h1>

                    {/* button add content */}
                    <LinkButtonBlue link={`/dashboard/courses/detail-course/${course.id}/add-content`} label='add content' />

                </div>
                {/* content */}
                <div className='w-full flex flex-col justify-start items-start gap-8'>
                    {
                        course.content.map((content: any, index: number) => (
                            <CourseContentCard key={index} content={content} number={`${index + 1}`} idCourse={course.id} />

                        ))
                    }
                </div>

                {/* pagination */}
                <div className='w-full flex flex-row justify-start items-center gap-3'>
                    {
                        [1, 2, 3, 4, 5].map((_, index: number) => (
                            <ButtonPagination key={index} number={index + 1} handleClick={() => handleActive(index)} active={active === index + 1} />
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default CourseDetail
