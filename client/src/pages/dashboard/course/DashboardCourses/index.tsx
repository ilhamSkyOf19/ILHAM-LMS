import { useState, type FC } from "react"
import TitleContentDashboard from "../../../../fragments/TitleContentDashboard"
import CourseCard from "../../../../components/CourseCard"
import ButtonPagination from "../../../../components/ButtonPagination"
import { useLoaderData } from "react-router-dom"
import LinkButtonBorder from "../../../../components/LinkButtonBorder"
import LinkButtonBlue from "../../../../components/LinkButtonBlue"
import type { ResponseData } from "../../../../types/types"
import type { CourseModel } from "../../../../models/course-model"

const DashboardCourses: FC = () => {
    // loader 
    const courses = useLoaderData() as ResponseData<CourseModel[]>;

    if (!courses.success) {
        console.log(courses.message);
    }

    console.log(courses);




    // state active 
    const [active, setActive] = useState<number>(1);
    // handle active
    const handleActive = (number: number): void => {
        setActive(number);
    }


    return (
        <div className="w-full flex flex-col justify-start items-start gap-8 pb-8">
            {/* header content */}
            <TitleContentDashboard title="Manage Courses" desc="Give the best future for your great employees">
                <LinkButtonBorder link="/" label="customize" />
                <LinkButtonBlue link="/dashboard/courses/new-course" label="new course" />
            </TitleContentDashboard>


            {/* content */}
            <div className="w-full flex flex-col justify-start items-start rounded-2xl bg-white-secondary py-8 px-6 gap-8">

                {/* manage card content */}
                {
                    (courses.success) ? (
                        courses.data && courses.data.length > 0 ? (
                            courses.data.map((course: CourseModel, i: number) => (
                                <CourseCard key={i} course={course} />
                            ))
                        ) : (
                            <p>No course found</p>
                        )
                    ) : (
                        null
                    )
                }

                {/* pagination */}
                <div className="w-full flex flex-row justify-start items-start gap-3">
                    {
                        [1, 2, 3, 4, 5].map((_, index: number) => (
                            <ButtonPagination
                                key={index} active={active === index + 1}
                                number={index + 1}
                                handleClick={() => handleActive(index + 1)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardCourses