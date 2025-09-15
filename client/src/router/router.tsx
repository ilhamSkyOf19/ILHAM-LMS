import { createBrowserRouter, redirect } from "react-router-dom";
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



import NewCourse from "../pages/dashboard/course/NewCourse";
import FormStudent from "../pages/dashboard/student/FormStudent";
import loaderAuth from "../contexts/loaders/useLoaderAuth";
import loaderCourse from "../contexts/loaders/useLoaderCourse";
import loaderCourseDetail from "../contexts/loaders/useLoaderCourseDetail";
import loaderCategory from "../contexts/loaders/useLoaderCategory";
import NewContent from "../pages/dashboard/course/NewContent";
import { loaderContentDetail } from "../contexts/loaders/useLoaderContent";
import type { AuthResponseType } from "../models/auth-model";
import type { ResponseData } from "../types/types";
import TransactionBundle from "../pages/dashboard/bundle/TransactionBundle";
import type { CourseModel } from "../models/course-model";
import Success from "../pages/Successs";
import { ManagerService } from "../services/manager.service";
import PreviewContent from "../pages/dashboard/PreviewContent";


import students from "../jsons/students.json";



const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/success',
        element: <Success />,
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
        loader: async () => {
            const response = await loaderAuth('ALL') as ResponseData<AuthResponseType>;

            // cek role 
            if (response.success && response.data.role === "MANAGER") {
                const manager = await ManagerService.getManager();

                if (!manager.success) return manager;

                if (!manager.data.bundle) {
                    return redirect("/transaction-bundle");
                }

                return { manager };
            }
            return response
        },
        element: <LayoutDashboard />,
        children: [
            {
                index: true,
                loader: async () => {
                    const [courses] = await Promise.all([
                        loaderCourse() as Promise<ResponseData<CourseModel[]>>]);

                    return { courses };
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
                    const [course] = await Promise.all([
                        loaderCourseDetail(params.id as string)
                    ]);

                    return { course };


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
                path: '/dashboard/courses/course-detail/:id/preview-content',
                loader: async ({ params }) => {
                    return loaderCourseDetail(params.id as string);
                },
                element: <PreviewContent />
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
    },
    {
        path: '/transaction-bundle',
        loader: () => {
            return useLoaderBundle()
        },
        element: <TransactionBundle />
    },
])

export default router;