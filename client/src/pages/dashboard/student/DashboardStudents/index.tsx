import { useState, type FC } from 'react'
import TitleContentDashboard from '../../../../fragments/TitleContentDashboard'
import LinkButtonBorder from '../../../../components/LinkButtonBorder'
import LinkButtonBlue from '../../../../components/LinkButtonBlue'
import StudentCard from '../../../../components/StudentCard'


// avatar
import { useLoaderData } from 'react-router-dom'
import ButtonDelete from '../../../../components/ButtonDelete'
import deleteAlert from '../../../../components/SweetAlertDelete'
import ButtonPagination from '../../../../components/ButtonPagination'

const DashboardStudents: FC = () => {

    // use loader 
    const students = useLoaderData();


    // state active 
    const [active, setActive] = useState<number>(1);



    // handle active 
    const handleActive = (number: number): void => {
        setActive(number + 1);
    }





    return (
        <div className='w-full h-full flex flex-col justify-start items-start gap-4'>
            {/* headers */}
            <TitleContentDashboard title='manage students' desc='Keep your employee or student happy'>

                {/* import file */}
                <LinkButtonBorder link='/' label='import file' />

                {/* add student */}
                <LinkButtonBlue link='/dashboard/students/new-student' label='add student' />
            </TitleContentDashboard>

            {/* content students */}
            <div className='w-full flex flex-col justify-start items-start gap-8 py-12 px-6 bg-white-secondary rounded-2xl'>
                {/* card student */}
                {
                    students.map((student: any, index: number) => (
                        <div key={index} className='w-full flex flex-row justify-between items-center'>
                            <StudentCard avatar={`/photos/${student.avatar}`} name={student.name} total_course={student.total_course} />

                            {/* button  */}
                            <div className='w-full flex flex-row justify-end items-center gap-3'>

                                {/* edit */}
                                <LinkButtonBorder link={`/dashboard/students/${student.id}`} label='edit student' />

                                {/* delete */}
                                <ButtonDelete type='button' label='delete' handleDelete={deleteAlert} />
                            </div>
                        </div>
                    ))
                }

                {/* pagination */}
                <div className='w-full flex flex-row justify-start items-center gap-3'>
                    {
                        [1, 2, 3, 4, 5].map((_, index: number) => (
                            <ButtonPagination key={index} number={index + 1} active={index + 1 === active} handleClick={handleActive} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardStudents
