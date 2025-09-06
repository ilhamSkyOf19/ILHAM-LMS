import { type FC } from 'react'
import FormAuthLayout from '../../../components/FormAuthLayout'
import { useForm } from 'react-hook-form'



// icons 

import user from '../../../assets/images/icons/user-octagon-white.svg'
import smsWhite from '../../../assets/images/icons/sms-white.svg'
import keyWhite from '../../../assets/images/icons/key-white.svg'
import BoxInputBorderInset from '../../../components/BoxInputBorderInset'
import MotionToLeft from '../../../motion/MotionToLeft'
import MotionToRight from '../../../motion/MotionToRight'
import BigTitleAuth from '../../../components/BigTitleAuth'



type FormData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

type Props = {
    type: 'manager' | 'student'
}

const SignUp: FC<Props> = ({ type }) => {

    // use form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({

    });


    // handle on submit
    const onSubmit = (data: FormData) => {
        console.log(data);
    }







    return (
        <div className='w-full min-h-[100vh] relative flex flex-row justify-between items-center px-12 py-12'>

            {/* form */}
            <div className='flex-1 flex flex-row justify-center items-center '>

                <MotionToRight>
                    <FormAuthLayout
                        type={type}
                        auth='signup'
                        handleSubmit={handleSubmit(onSubmit)}
                    >
                        {/* name */}
                        <BoxInputBorderInset
                            register={register('name', { required: 'name is required' })}
                            type='text'
                            placeholder='Write your full name'
                            name='name'
                            icon={user}
                            error={errors?.name}

                        />

                        {/* email */}
                        <BoxInputBorderInset
                            register={register('email', { required: 'email is required' })}
                            type='email'
                            placeholder='Write your email address'
                            name='email'
                            icon={smsWhite}
                            error={errors?.email}
                        />

                        {/* password */}
                        <BoxInputBorderInset
                            register={register('password', { required: 'password is required' })}
                            type='password'
                            placeholder='Type your secure password'
                            name='password'
                            icon={keyWhite}
                            error={errors?.password}
                        />

                        {/* confirm password */}
                        <BoxInputBorderInset
                            register={register('confirmPassword', { required: 'confirm password is required' })}
                            type='password'
                            placeholder='Confirm your password'
                            name='confirmPassword'
                            icon={keyWhite}
                            error={errors?.confirmPassword}
                        />

                    </FormAuthLayout>
                </MotionToRight>
            </div>

            {/* big title */}
            <div className='flex-1 h-full pb-32'>
                <MotionToLeft>
                    {type === 'manager' && (
                        <BigTitleAuth
                            text1='Sign Up & Manage'
                            text2='Your Courses'
                            text3='Create, organize, and monitor learning'
                            text4='content to help your students grow effectively.'
                        />
                    )}
                    {type === 'student' && (
                        <BigTitleAuth
                            text1='Sign Up & Enhance'
                            text2='Employees Skills'
                            text3='We delivery robust features to anyone'
                            text4='unconditionally so they can grow bigger.'
                        />
                    )}
                </MotionToLeft>

            </div>
        </div>
    )
}

export default SignUp
