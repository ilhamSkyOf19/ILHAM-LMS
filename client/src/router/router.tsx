import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import Welcome from "../pages/Welcome";
import LayoutGlobal from "../layouts/LayoutGlobal";

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
                element: <SignUp />
            },
            {
                path: '/manager/sign-in',
                element: <SignUp />
            }
        ]

    }
])

export default router;