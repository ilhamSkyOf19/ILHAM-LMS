import { redirect } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import type { ResponseData } from "../../types/types";
import type { AuthResponseType } from "../../models/auth-model";

// const
const loaderAuth = async (role: 'MANAGER' | 'STUDENT' | 'ALL'): Promise<Response | ResponseData<AuthResponseType>> => {
    try {



        // get response 
        const response = await AuthService.getAuth(role);



        // cek response 
        if (!response.success) {
            return redirect('/student/sign-in');
        };

        // cek response data 
        if (!response.data) {
            return redirect('/student/sign-in');
        };


        // cek response 
        if (role === 'MANAGER' || role === 'STUDENT') {
            if (response.data.role !== role) {
                return redirect('/student/sign-in');
            }
        }




        // return 
        return {
            success: true,
            data: response.data
        }


    } catch (error) {
        console.log(error);
        return redirect('/student/sign-in');
    }

}


export default loaderAuth