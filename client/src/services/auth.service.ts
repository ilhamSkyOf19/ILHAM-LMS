import AXIOS from "../lib/axios";
import type { AuthResponseType, SignInRequestType, SignUpRequestType } from "../models/auth-model";
import type { ResponseData, ResponseMessage } from "../types/types";

export class AuthService {

    // get auth 
    static async getAuth(role: 'MANAGER' | 'STUDENT' | 'ALL'): Promise<ResponseData<AuthResponseType>> {

        // get response 
        const response = await AXIOS.get(`/auth/${role.toLocaleLowerCase()}`).then(res => res.data);

        console.log(response);
        // return response 
        return response
    }


    // sign up 
    static async signUp(req: SignUpRequestType, type: 'student' | 'manager'): Promise<ResponseMessage> {

        // get response
        const response = await AXIOS.post(`${type === 'student' ? '/student/create' : '/manager/create'}`, req, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data)


        // return success 
        return response;
    }


    // sign in 
    static async signIn(req: SignInRequestType, type: 'student' | 'manager'): Promise<ResponseMessage> {

        // get response 
        const response = await AXIOS.post(`${type === 'student' ? '/student/signin' : '/manager/signin'}`, req, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data);


        // return success
        return response
    }




}