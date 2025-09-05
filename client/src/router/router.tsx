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


// jsons
import user from "../jsons/user.json";
import statistik from "../jsons/statistik.json";
import courses from "../jsons/courses.json";




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
            return user;
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
                    return courses;
                },
                element: <DashboardCourses />
            },
            {
                path: '/dashboard/courses/course-detail/:id',
                loader: ({ params }) => {
                    return courses.find((course: any) => course.id == params.id);
                },
                element: <CourseDetail />
            }
        ]
    }
])

export default router;