import { redirect } from "react-router-dom";
import type { AuthResponseType } from "../../models/auth-model";
import type { CourseModel } from "../../models/course-model";
import type { ResponseData } from "../../types/types";
import loaderAuth from "./useLoaderAuth"
import { CourseService } from "../../services/course.service";

const loaderCourse = async (): Promise<ResponseData<CourseModel[]> | Response> => {
    try {

        // cek role 
        const role = await loaderAuth("ALL") as ResponseData<AuthResponseType>;

        // cek role 
        if (role.success) {
            if (role.data.role === 'STUDENT') {
                return CourseService.get<CourseModel[]>('STUDENT');
            } else if (role.data.role === 'MANAGER') {
                return CourseService.get<CourseModel[]>('MANAGER');
            }
        } else {
            return redirect('/student/sign-in');
        }


        return {
            success: false,
            message: 'invalid role'
        }


    } catch (error: any) {

        // cek err
        if (error.status === 401) {
            return redirect('/student/sign-in');
        }

        return {
            success: false,
            message: 'something went wrong'
        };

    }
}


export default loaderCourse