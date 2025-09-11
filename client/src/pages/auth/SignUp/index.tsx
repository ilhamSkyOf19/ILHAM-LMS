import { type FC } from 'react'
import FormAuthLayout from '../../../components/FormAuthLayout'
import { useForm } from 'react-hook-form'
import BoxInputBorderInset from '../../../components/BoxInputBorderInset'
import MotionToLeft from '../../../motion/MotionToLeft'
import MotionToRight from '../../../motion/MotionToRight'
import BigTitleAuth from '../../../components/BigTitleAuth'
import type { SignUpRequestType } from '../../../models/auth-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'


// icons 

import user from '../../../assets/images/icons/user-octagon-white.svg'
import smsWhite from '../../../assets/images/icons/sms-white.svg'
import keyWhite from '../../../assets/images/icons/key-white.svg'
import { AuthValidation } from '../../../validations/auth-validation'
import { AuthService } from '../../../services/auth.service'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { notif } from '../../../utils/sweetAlert'




type Props = {
    type: 'manager' | 'student'
}

const SignUp: FC<Props> = ({ type }) => {

    // navigate 
    const navigate = useNavigate();

    // use form
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequestType>({
        resolver: zodResolver(AuthValidation.SIGN_UP)
    });


    // handle mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: SignUpRequestType) => AuthService.signUp(data, type),
        onError: (errors: unknown) => {
            if (errors instanceof AxiosError) {

                // notification
                notif('error', errors.response ? errors.response.data.message : 'something went wrong');

            } else {
                console.log(errors)
            }
        },
        onSuccess: (data) => {
            // redirect
            navigate('/dashboard');
            console.log(data)
        }
    })


    // handle on submit
    const onSubmit = (data: SignUpRequestType) => {
        try {
            // cek data 
            if (!data) {
                return
            }

            // response 
            mutateAsync(data);


        } catch (error) {
            console.log(error)
        }
    }







    return (
        <div className='w-full min-h-[100vh] relative flex flex-row justify-between items-center px-12 py-12'>

            {/* form */}
            <div className='flex-1 flex flex-row justify-center items-center '>

                <MotionToRight>
                    <FormAuthLayout
                        type={type}
                        auth='signup'
                        buttonDisable={isPending}
                        handleSubmit={handleSubmit(onSubmit)}
                    >
                        {/* name */}
                        <BoxInputBorderInset
                            register={register('name')}
                            type='text'
                            placeholder='Write your full name'
                            name='name'
                            icon={user}
                            error={errors?.name}

                        />

                        {/* email */}
                        <BoxInputBorderInset
                            register={register('email')}
                            type='email'
                            placeholder='Write your email address'
                            name='email'
                            icon={smsWhite}
                            error={errors?.email}
                        />

                        {/* password */}
                        <BoxInputBorderInset
                            register={register('password')}
                            type='password'
                            placeholder='Type your secure password'
                            name='password'
                            icon={keyWhite}
                            error={errors?.password}
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
