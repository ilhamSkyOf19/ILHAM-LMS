import { type FC } from 'react'
import DescCard from '../DescCard';

import glow from '../../assets/images/backgrounds/sidebar-glow.png'


// icons 
import videoPlayWhite from '../../assets/images/icons/video-play-white.svg'
import noteWhite from '../../assets/images/icons/note-white.svg'
import videoPlayPurple from '../../assets/images/icons/video-play-purple.svg'
import notePurple from '../../assets/images/icons/note-purple.svg'
import LinkButtonBorder from '../LinkButtonBorder';
import ButtonDelete from '../ButtonDelete';
import deleteAlert from '../SweetAlertDelete';

type Props = {
    idCourse: number;
    number: string;
    content: any;
}
const CourseContentCard: FC<Props> = ({ number, content, idCourse }) => {
    console.log(content.type)
    return (
        <div className='w-full flex flex-row justify-between items-center relative'>

            {/* number */}
            <div className='bg-blue-primary w-[2rem] h-[2rem] rounded-full flex flex-row justify-center items-center absolute z-10 -top-3 -left-3'>
                <p className='text-white font-semibold text-sm'>{number}</p>
            </div>

            <div className='flex-2 w-full flex flex-row justify-start items-center gap-5'>
                {/* thumbnail */}
                <div className='w-[9rem] h-[7.5rem] rounded-3xl relative overflow-hidden bg-[#060A23] flex flex-col justify-center items-center'>
                    {/* glow */}
                    <img src={glow} alt='glow' className='absolute object-cover object-bottom bottom-0 w-full z-0' loading='lazy' />

                    {/* icon */}
                    <img src={content.type === 'video' ? videoPlayWhite : noteWhite} alt='icon' className=' w-12 z-10' loading='lazy' />

                </div>

                {/* label */}
                <div className='flex flex-col justify-center items-start gap-1.5'>
                    {/* name */}
                    <h2 className='text-black text-xl font-bold'>{content.name}</h2>
                    {/* description */}
                    <DescCard icon={content.type === 'video' ? videoPlayPurple : notePurple} label={content.type} />
                </div>
            </div>

            {/* button */}
            <div className='flex-1 flex flex-row justify-end items-center gap-3'>
                {/* edit content */}
                <LinkButtonBorder link={`/dashboard/courses/course-detail/${idCourse}/edit-content/${content.id}`} label='edit content' />

                {/* delete content */}
                <ButtonDelete type='button' label='delete' handleDelete={deleteAlert} />
            </div>
        </div>
    )
}

export default CourseContentCard
