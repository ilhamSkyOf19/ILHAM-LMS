import { type FC } from 'react'
import DescCard from '../DescCard'





// thumbnail
import thumb from '../../assets/images/thumbnails/th-1.png'

// icons
import user from '../../assets/images/icons/profile-2user-purple.svg'
import crownPurple from '../../assets/images/icons/crown-purple.svg'
import LinkButtonBorderHoverBlue from '../LinkButtonBorderHoverBlue'
import type { CourseModel } from '../../models/course-model'



type Props = {
    course: CourseModel;
}
const CourseCard: FC<Props> = ({ course }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* thumbnail */}
            <div className='flex flex-row justify-start items-center gap-4'>
                <div className='w-[9rem] h-[7rem] rounded-2xl overflow-hidden'>
                    <img src={thumb} alt='thumbnail' className='w-full h-full object-cover' />
                </div>

                {/* label */}
                <div className='flex flex-col justify-center items-start gap-1.5'>
                    {/* name */}
                    <h2 className='text-black text-xl font-bold'>{(course.name).slice(0, 35).concat('...')}</h2>

                    {/* total student & category */}
                    <div className='flex flex-row justify-start items-start gap-4'>

                        {/* total student */}
                        <DescCard icon={user} label={`${(0).toLocaleString('en-US')} students`} />

                        {/* category */}
                        <DescCard icon={crownPurple} label={`${course.category.name}`} />

                    </div>
                </div>
            </div>

            {/* button */}
            <LinkButtonBorderHoverBlue link={`/dashboard/courses/course-detail/${course._id}`} label='manage' />
        </div>
    )
}

export default CourseCard
