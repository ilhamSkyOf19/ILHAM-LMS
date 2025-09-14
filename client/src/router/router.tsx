import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Welcome from "../pages/Welcome";
import LayoutGlobal from "../layouts/LayoutGlobal";
import SignIn from "../pages/auth/SignIn";
import BundlePage from "../pages/BundlePage";
import useLoaderBundle from "../contexts/loaders/useLoaderBundle";
import DashboardHome from "../pages/dashboard/DashboardHome";
import LayoutDashboard from "../layouts/LayoutDashboard";
import NotFound from "../pages/404";
import CourseDetail from "../pages/dashboard/course/CourseDetail";
import DashboardCourses from "../pages/dashboard/course/DashboardCourses";
import DashboardStudents from "../pages/dashboard/student/DashboardStudents";


// jsons
import statistik from "../jsons/statistik.json";
import students from "../jsons/students.json";
import NewCourse from "../pages/dashboard/course/NewCourse";
import FormStudent from "../pages/dashboard/student/FormStudent";
import loaderAuth from "../contexts/loaders/useLoaderAuth";
import loaderCourse from "../contexts/loaders/useLoaderCourse";
import loaderCourseDetail from "../contexts/loaders/useLoaderCourseDetail";
import loaderCategory from "../contexts/loaders/useLoaderCategory";
import NewContent from "../pages/dashboard/course/NewContent";
import { loaderContent, loaderContentDetail } from "../contexts/loaders/useLoaderContent";



const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/',
        element: <LayoutGlobal />,
        children: [
            {
                index: true,
                element: <Welcome />
            },
            {
                path: '/manager/sign-up',
                element: <SignUp type="manager" />
            },
            {
                path: '/manager/sign-in',
                element: <SignIn type="manager" />
            },
            {
                path: '/student/sign-up',
                element: <SignUp type="student" />
            },
            {
                path: '/student/sign-in',
                element: <SignIn type="student" />
            },
            {
                path: '/bundle',
                loader: () => {
                    return useLoaderBundle()
                },
                element: <BundlePage />
            },
        ]
    },
    {
        path: '/dashboard',
        loader: () => {
            return loaderAuth('ALL');
        },
        element: <LayoutDashboard />,
        children: [
            {
                index: true,
                loader: () => {
                    return statistik;
                },
                element: <DashboardHome />
            },
            {
                path: '/dashboard/courses',
                loader: () => {
                    return loaderCourse();
                },
                element: <DashboardCourses />
            },
            {
                path: '/dashboard/courses/course-detail/:id',
                loader: async ({ params }) => {
                    const [course, contents] = await Promise.all([
                        loaderCourseDetail(params.id as string), loaderContent(params.id as string)
                    ]);

                    return { course, contents };


                },
                element: <CourseDetail />
            },
            {
                path: '/dashboard/courses/new-course',
                loader: async () => {
                    const categories = await loaderCategory();
                    return { categories };
                },
                element: <NewCourse typeContent="new" />
            },
            {
                path: '/dashboard/courses/course-detail/:id/edit-course',
                loader: async ({ params }) => {
                    const [course, categories] = await Promise.all([
                        loaderCourseDetail(params.id as string),
                        loaderCategory()
                    ]);



                    return {
                        course,
                        categories
                    };
                },
                element: <NewCourse typeContent="edit" />
            },
            {
                path: '/dashboard/courses/course-detail/:id/new-content',
                element: <NewContent typeContent="new" />
            },
            {
                path: '/dashboard/courses/course-detail/:id/edit-content/:idContent',
                loader: async ({ params }) => {
                    const content = await loaderContentDetail(params.idContent as string);
                    return { content };
                },
                element: <NewContent typeContent="edit" />
            },
            {
                path: '/dashboard/students',
                loader: () => {
                    return students;
                },
                element: <DashboardStudents />
            },
            {
                path: '/dashboard/students/new-student',
                element: <FormStudent />
            },
            {
                path: '/dashboard/students/:id/edit-student',
                loader: ({ params }) => {
                    return students.find((student: any) => student.id == params.id);
                },
                element: <FormStudent />
            },
        ]
    }
])

export default router;