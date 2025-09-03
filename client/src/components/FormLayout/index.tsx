import { type FC } from 'react'

const FormLayout: FC = () => {
    return (
        <form className='w-[22rem] h-[28rem] border border-border-color-primary rounded-3xl p-6'>

            {/* header */}
            <div className='w-full flex flex-col justify-start items-start gap-1.5'>

                {/* type */}
                <h1 className='font-bold text-2xl text-white capitalize'>sign up</h1>
                {/* desc */}
                <h3 className='text-sm text-white-primary'>
                    Manage your employees easily
                </h3>
            </div>

            {/* input */}

            <div>

            </div>
        </form>
    )
}

export default FormLayout
