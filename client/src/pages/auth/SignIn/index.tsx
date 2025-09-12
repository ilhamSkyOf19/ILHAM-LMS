import { type FC } from 'react'
import FormAuthLayout from '../../../components/FormAuthLayout'
import BoxInputBorderInset from '../../../components/BoxInputBorderInset'


// icons
import smsWhite from '../../../assets/images/icons/sms-white.svg'
import keyWhite from '../../../assets/images/icons/key-white.svg'
import { useForm } from 'react-hook-form'
import MotionToLeft from '../../../motion/MotionToLeft'
import MotionToRight from '../../../motion/MotionToRight'
import BigTitleAuth from '../../../components/BigTitleAuth'
import { useNavigate } from 'react-router-dom'
import { AuthValidation } from '../../../validations/auth-validation'
import type { SignInRequestType } from '../../../models/auth-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../../../services/auth.service'
import { AxiosError } from 'axios'


type Props = {
    type: 'manager' | 'student'
}
const SignIn: FC<Props> = ({ type }) => {

    // navigate 
    const navigate = useNavigate();


    // use hook form 
    const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInRequestType>({
        resolver: zodResolver(AuthValidation.SIGN_IN)
    })

    // use mutation 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: SignInRequestType) => AuthService.signIn(data, type),
        onError: (errors: unknown) => {
            if (errors instanceof AxiosError) {
                console.log(errors.response?.data.message);
                if (errors.status === 400) {
                    // email or password wrong 
                    setError(("email"), { type: 'manual', message: errors.response?.data.message });
                    setError(("password"), { type: 'manual', message: errors.response?.data.message });

                } else {
                    console.log(errors.response?.data.message);
                }

            } else {
                console.log(errors)
            }
        },
        onSuccess: (data) => {
            // navigate 
            navigate('/dashboard');
            console.log('login', data)
        }
    })


    // on submit 
    const onSubmit = (data: SignInRequestType) => {
        try {
            // cek data 
            if (!data) return;

            // mutae 
            mutateAsync(data);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='w-full flex flex-row justify-center items-center px-12 min-h-[100vh]'>
            {/* big title */}
            <div className='flex-1 h-full flex flex-col justify-start items-start gap-8'>
                <MotionToLeft>
                    {type === 'manager' && (
                        <BigTitleAuth
                            text1='Sign In & Manage'
                            text2='Your Courses'
                            text3='Create, organize, and monitor learning'
                            text4='content to help your students grow effectively.'
                        />
                    )}
                    {type === 'student' && (
                        <BigTitleAuth
                            text1='Sign In & Enhance'
                            text2='Employees Skills'
                            text3='We delivery robust features to anyone'
                            text4='unconditionally so they can grow bigger.'
                        />
                    )}
                </MotionToLeft>
            </div>
            <div className='flex-1 flex flex-row justify-center items-start'>
                <MotionToRight>
                    <FormAuthLayout
                        handleSubmit={handleSubmit(onSubmit)}
                        buttonDisable={isPending}
                        type={type} auth='signin'>
                        {/* email */}
                        <BoxInputBorderInset
                            type='email'
                            icon={smsWhite}
                            name='email'
                            placeholder='Write your email address'
                            register={register('email')}
                            error={errors?.email}
                        />

                        {/* password */}
                        <BoxInputBorderInset
                            type='password'
                            icon={keyWhite}
                            name='password'
                            placeholder='Type your secure password'
                            register={register('password')}
                            error={errors?.password}
                        />

                    </FormAuthLayout>
                </MotionToRight>
            </div>
        </div>
    )
}

export default SignIn
