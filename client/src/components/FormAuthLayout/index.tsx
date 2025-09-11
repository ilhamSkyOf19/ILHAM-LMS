import { type BaseSyntheticEvent, type FC, type ReactNode } from 'react'
import ButtonBlueShadowPurple from '../ButtonBlueShadowPurple';
import { Link, useLocation } from 'react-router-dom';




type Props = {
    children: ReactNode;
    type: 'manager' | 'student';
    auth: 'signin' | 'signup';
    handleSubmit: (e: BaseSyntheticEvent) => Promise<void>;
    buttonDisable?: boolean
}

const FormAuthLayout: FC<Props> = ({ children, type, auth, handleSubmit, buttonDisable }) => {


    // type form 
    const pathname = useLocation().pathname;




    return (
        <form onSubmit={handleSubmit} className='w-[25rem] border border-border-color-primary rounded-3xl px-6 bg-blue-secondary flex flex-col justify-start items-center pt-10 pb-6'>
            <div className='w-full flex flex-col justify-start items-center gap-8 mb-6'>
                {/* header */}
                <div className='w-full flex flex-col justify-start items-start gap-1.5'>

                    {/* type */}
                    <h1 className='font-bold text-2xl text-white 
                capitalize'>{
                            auth === 'signup' ? 'sign up' : 'welcome back!'
                        }</h1>

                    {/* desc */}
                    <h3 className='text-sm text-white-primary'>
                        Manage your employees easily
                    </h3>
                </div>

                {/* input */}

                <div className='w-full flex flex-col justify-start items-center py-8 relative before:content-[""] before:w-full before:h-[1px] before:bg-border-color-primary before:absolute before:top-0 after:content-[""] after:w-full after:h-[1px] after:bg-border-color-primary after:absolute after:bottom-0 gap-2'>

                    {children}

                </div>

                {/* button */}
                <ButtonBlueShadowPurple type='submit' label={pathname.includes('signin') ? 'sign in' : 'sign up'} disabled={buttonDisable} />
            </div>

            {/* link */}

            <div className='w-full flex flex-row justify-center items-center gap-1'>
                <p className='text-white text-sm'>{pathname.includes('sign-in') ? 'Don’t have an account?' : 'Already have an account?'}</p>
                <Link
                    to={pathname.includes('sign-in') ? `/${type}/sign-up` : `/${type}/sign-in`}
                    className='text-blue-500 text-sm'>
                    {pathname.includes('sign-in') ? 'Sign Up' : 'Sign In'}
                </Link>
            </div>
        </form>
    )
}

export default FormAuthLayout
