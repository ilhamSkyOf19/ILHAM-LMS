import { type FC } from 'react'
import clsx from 'clsx'

import videoIcon from '../../assets/images/icons/video-play-white.svg'
import textIcon from '../../assets/images/icons/note-favorite-white.svg'
import type { ContentResponse } from '../../models/content-model'

type Props = {
    index: number
    content: ContentResponse;
    handleContent: (index: number) => void
}
const BoxContent: FC<Props> = ({ content: { title, type }, handleContent, index }) => {



    return (
        <button type='button' className={clsx(
            'w-full py-3.5 px-4.5 bg-[#060A23] flex flex-row justify-start items-center gap-4 rounded-full',
            'shadow-[-10px_-6px_10px_0_#181A35_inset] border border-[#181A35]',
            'hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:bg-blue-primary transition-all duration-300 group'
        )} onClick={() => handleContent(index)}>
            {/* icon */}
            <div className='flex-1 h-full flex flex-col justify-center items-center'>
                <img src={type === 'text' ? textIcon : videoIcon} alt='icon' className='w-6' loading='lazy' />
            </div>

            {/* text */}
            <div className='flex-7 flex flex-col justify-center items-start h-full hover:duration-1000'>
                <p className='text-white text-sm font-semibold text-left'>
                    <span className="inline group-hover:hidden">
                        {
                            (title).length > 30 ? (
                                (title).slice(0, 30).concat('...')

                            ) : (
                                (title)

                            )

                        }
                    </span>
                    <span className="hidden group-hover:inline">
                        {
                            (title)
                        }
                    </span>
                </p>
            </div>
        </button>
    )
}

export default BoxContent
