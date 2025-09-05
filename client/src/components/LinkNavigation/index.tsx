import { type FC } from 'react'
import { Link } from 'react-router-dom';
import type { LinkType } from '../../types/types';
import clsx from 'clsx';


type Props = {
    data: LinkType[]
}
const LinkNavigation: FC<Props> = ({ data }) => {
    return (
        <div className='w-full flex flex-row justify-start items-start'>
            {
                data.map((item: LinkType, i: number) => (
                    <div key={i} className='flex flex-row justify-start items-start'>
                        {
                            i === 0 ? null : <p className='text-black mx-4'>/</p>
                        }
                        <Link to={item.link} className={clsx(
                            'text-black capitalize hover:underline',
                            i === 2 ? 'font-semibold' : 'font-normal'
                        )}>{item.label}</Link>
                    </div>
                ))
            }
        </div>
    )
}

export default LinkNavigation
