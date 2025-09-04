import { type FC } from 'react'


// icons
import crownPurple from '../../assets/images/icons/crown-purple.svg'




type Props = {
    thumbnail: string
    title: string;
    category: 'programming' | 'design';
}
const CourseLatestCard: FC<Props> = ({ thumbnail, title, category }) => {
    return (
        <div className="w-full flex flex-row justify-start items-center gap-6 group">
            {/* thumbnail */}
            <div className="w-[8rem] h-[5.5rem] rounded-2xl overflow-hidden">
                <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* label */}
            <div className='w-full flex flex-col justify-start items-start gap-1.5'>

                {/* title */}
                <h2 className='font-bold text-xl tex-black group-hover:text-blue-primary'>
                    {title.slice(0, 17).concat('...')}
                </h2>

                {/* category */}
                <div className='w-full flex flex-row justify-start items-start gap capitalize gap-2'>
                    <img src={crownPurple} alt="crown" className='w-5' loading='lazy' />
                    <p className='text-slate-400 capitalize'>{category}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseLatestCard
