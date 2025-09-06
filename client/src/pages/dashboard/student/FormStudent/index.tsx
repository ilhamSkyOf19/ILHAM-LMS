import { type FC } from 'react'
import TitleContentDashboard from '../../../../fragments/TitleContentDashboard'
import { useForm } from 'react-hook-form';
import BoxInputAvatar from '../../../../components/BoxInputAvatar';
import type { Student } from '../../../../types/types';
import ButtonBlue from '../../../../components/ButtonBlue';
import BoxInputData from '../../../../components/BoxInputData';


// icon
import note from '../../../../assets/images/icons/note-favorite-black.svg'
import iconEmail from '../../../../assets/images/icons/sms-black.svg'
import iconLock from '../../../../assets/images/icons/lock-black.svg'
import { useLoaderData } from 'react-router-dom';
import sweetAlertNotiifNotUpdate from '../../../../components/SweetAlertNotifNotUpdate';


const FormStudent: FC = () => {

    // use loader data
    const students = useLoaderData();


    // use hook form 
    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<Student>({
        // default values
        defaultValues: ({
            avatar: students?.avatar || null,
            name: students?.name || '',
            email: students?.email || '',
            password: students?.password || ''
        })
    });


    // handle on submit
    const onSubmit = (data: Student) => {
        // cek data 
        if (!data.avatar && !data.name && !data.email && !data.password) {
            sweetAlertNotiifNotUpdate();
            return;
        };

        console.log(data)
    };

    return (
        <div className='w-full flex flex-col justify-start items-start pb-12 gap-4'>
            {/* header */}
            <TitleContentDashboard title='add student' desc='Create new student'>
                {null}
            </TitleContentDashboard>


            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] rounded-2xl bg-white-secondary flex flex-col justify-start items-start p-8 gap-1'>
                {/* input add avatar */}
                <BoxInputAvatar
                    setValue={setValue}
                    error={errors?.avatar}
                    register={register('avatar', students ? {} : { required: 'avatar is required' })}
                    clearErrors={clearErrors}
                    previewEdit={students?.avatar}
                />


                {/* full name */}
                <BoxInputData
                    icon={note}
                    type='text'
                    name='name'
                    placeholder='Write your full name'
                    label='full name'
                    register={register('name', students ? {} : { required: 'name is required' })}
                    error={errors?.name}
                />

                {/* email address */}
                <BoxInputData
                    icon={iconEmail}
                    type='email'
                    name='email'
                    placeholder='Write your email address'
                    label='email address'
                    register={register('email', students ? {} : { required: 'email is required' })}
                    error={errors?.email}
                />

                {/* password */}
                <BoxInputData
                    icon={iconLock}
                    type='password'
                    name='password'
                    placeholder='Write your password'
                    label='password'
                    register={register('password', students ? {} : { required: 'password is required' })}
                    error={errors?.password}
                />

                {/* button submit */}
                <div className='w-full mt-4'>
                    <ButtonBlue type='submit' label='add student' />
                </div>
            </form>
        </div>
    )
}

export default FormStudent
