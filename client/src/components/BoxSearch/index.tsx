import { type FC } from 'react'

import searchNormal from '../../assets/images/icons/search-normal.svg'


const BoxSearch: FC = () => {
    return (
        <div className='w-full border border-slate-300 py-3 px-6 flex flex-row justify-between items-center rounded-full focus-within:ring-2 focus-within:ring-blue-primary transition-all duration-300'>
            {/* input search */}
            <input
                type='text'
                name='search'
                className='flex-1 outline-none text-black font-semibold text-md placeholder:font-normal placeholder:text-[#6B6C7F]'
                placeholder='Search course, student, other file...'
            />

            {/* icon label */}
            <label htmlFor='search'>
                <img src={searchNormal} className='w-6' alt="icon" loading='lazy' />
            </label>
        </div>
    )
}

export default BoxSearch
