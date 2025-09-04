import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import Welcome from "../pages/Welcome";
import LayoutGlobal from "../layouts/LayoutGlobal";
import SignIn from "../pages/auth/SignIn";

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
            }
        ]

    }
])

export default router;