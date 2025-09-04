import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import Welcome from "../pages/Welcome";
import LayoutGlobal from "../layouts/LayoutGlobal";
import SignIn from "../pages/auth/SignIn";
import BundlePage from "../pages/BundlePage";
import useLoaderBundle from "../contexts/loaders/useLoaderBundle";
import DashboardHome from "../pages/dashboard/DashboardHome";
import LayoutDashboard from "../layouts/LayoutDashboard";
import DashboardCourses from "../pages/dashboard/DashboardCourses";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/',
        element: <LayoutGlobal />,
        children: [
            {
                path: '/welcome',
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
        element: <LayoutDashboard />,
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: '/dashboard/courses',
                element: <DashboardCourses />
            }
        ]
    }
])

export default router;