import { type FC } from 'react'

// assets
import sidebarGlow from '../../assets/images/backgrounds/sidebar-glow.png'
import { Link } from 'react-router-dom'
import BoxContent from '../BoxContent'
import type { ContentResponse } from '../../models/content-model'

type Props = {
    thumbnail: string
    name: string
    contents: ContentResponse[]
    handleContent: (index: number) => void
}
const SideBarPreviewContent: FC<Props> = ({ thumbnail, name, contents, handleContent }) => {
    return (
        <div className='w-[18rem] rounded-2xl bg-[#060A23] h-[97vh] fixed flex flex-col justify-start items-start overflow-hidden'>

            {/* background glow */}
            <img src={sidebarGlow} className='absolute object-contain object-bottom bottom-0 left-0 w-full z-0' />

            {/* content */}
            <div className='w-full flex flex-col justify-start items-start overflow-y-scroll no-scroll py-12 px-6 z-10'>
                {/* header sidebar */}
                {/* link dashboard */}
                <Link to={'/dashboard'} className='text-white text-base font-semibold hover:underline capitalize mb-6'>back to dashboard</Link>


                <div className='w-full flex flex-col justify-start items-start gap-6'>
                    {/* thumbnail */}
                    <div className='w-[9rem] h-[7rem] rounded-3xl overflow-hidden bg-white'>
                        <img src={thumbnail} className='w-full h-full object-cover' alt="thumbnail" />
                    </div>

                    {/* name */}
                    <h4 className='text-white font-bold text-xl'>{name}</h4>
                </div>


                {/* contents */}
                <div className='w-full flex flex-col justify-start items-start mt-6 z-10 gap-4'>
                    {
                        contents && contents.length > 0 ? (
                            contents.map((content: ContentResponse, index) => (
                                <BoxContent key={index} index={index + 1} content={content} handleContent={handleContent} />
                            ))
                        ) : (
                            <p className='text-white text-sm font-semibold'>No contents</p>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default SideBarPreviewContent
