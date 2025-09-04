import { type FC } from 'react'
import FormAuthLayout from '../../../components/FormAtuhLayout'
import BoxInputBorderInset from '../../../components/BoxInputBorderInset'


// icons
import smsWhite from '../../../assets/images/icons/sms-white.svg'
import keyWhite from '../../../assets/images/icons/key-white.svg'
import { useForm } from 'react-hook-form'
import MotionToLeft from '../../../motion/MotionToLeft'
import MotionToRight from '../../../motion/MotionToRight'
import BigTitleAuth from '../../../components/BigTitleAuth'

type Props = {
    type: 'manager' | 'student'
}
const SignIn: FC<Props> = ({ type }) => {


    // use hook form 
    const { register } = useForm({

    })


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
                    <FormAuthLayout type={type} auth='signin'>
                        {/* email */}
                        <BoxInputBorderInset
                            type='email'
                            icon={smsWhite}
                            name='email'
                            placeholder='Write your email address'
                            register={register('email')}
                        />

                        {/* password */}
                        <BoxInputBorderInset
                            type='password'
                            icon={keyWhite}
                            name='password'
                            placeholder='Type your secure password'
                            register={register('password')}
                        />

                    </FormAuthLayout>
                </MotionToRight>
            </div>
        </div>
    )
}

export default SignIn
