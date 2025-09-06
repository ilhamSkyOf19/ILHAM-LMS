import { type FC } from 'react'
import clsx from 'clsx'
import type { FieldError } from 'react-hook-form'

type Props = {
    error?: FieldError;
}

const ErrorMessage: FC<Props> = ({ error }) => {
    return (
        <div className='w-full min-h-4.5 mt-1'>
            <p className={clsx(
                'text-red-500 text-xs transition-all duration-200',
                error ? 'visible' : 'invisible'
            )}>{error?.message}</p>
        </div>
    )
}

export default ErrorMessage
