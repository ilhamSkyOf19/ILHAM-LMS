import clsx from 'clsx'
import { type FC } from 'react'

type Props = {
    choose?: { label: string, value: string }[],
    select?: { label: 'video' | 'text', value: 'video' | 'text' }[],
    isOpen: boolean,
    handleChoose?: (value: string) => void,
    setValueChoose?: (value: string) => void
    handleSelect?: (value: 'video' | 'text') => void,
    setValueSelect?: (value: 'video' | 'text') => void
}

const ModalSelect: FC<Props> = ({ choose, isOpen, handleChoose, setValueChoose, handleSelect, setValueSelect, select }) => {
    return (
        <div className={clsx(
            'absolute top-[110%] left-0 w-full flex flex-col justify-start items-center z-20 transition-all duration-200 origin-top',
            isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        )}>
            <div className='w-[90%] h-full flex flex-col justify-start items-start bg-white z-20 border border-slate-200'>
                {/* choose */}
                {
                    (handleChoose && setValueChoose && choose) ? (
                        choose.map((item: { label: string, value: string }, i: number) => (
                            <button key={i} type='button' className='w-full px-4 py-2 hover:bg-blue-primary hover:text-white transition-all duration-200 text-left font-semibold capitalize text-sm' onClick={() => { handleChoose(item.value), setValueChoose(item.label) }}>{item.label}</button>
                        ))
                    ) : (handleSelect && setValueSelect && select) ? (
                        select.map((item: { label: 'video' | 'text', value: 'video' | 'text' }, i: number) => (
                            <button key={i} type='button' className='w-full px-4 py-2 hover:bg-blue-primary hover:text-white transition-all duration-200 text-left font-semibold capitalize text-sm' onClick={() => { handleSelect(item.value), setValueSelect(item.label) }}>{item.label}</button>

                        ))

                    ) : null
                }
            </div>
        </div>
    )
}

export default ModalSelect
