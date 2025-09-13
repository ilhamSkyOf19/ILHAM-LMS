import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { ResponseData } from "../types/types";
import type { CourseModel } from "../models/course-model";

export class CourseService {

    // create 
    static async create(type: 'edit' | 'new', id: string, data: FormData): Promise<ResponseData<CourseModel>> {
        // response 
        const response = (type === 'edit' && id)
            ? await AXIOS.patch(`course/update/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            : await AXIOS.post('course/create', data, { headers: { 'Content-Type': 'multipart/form-data' } });


        return response.data
    }

    // get by role
    static async get<T>(
        role: 'STUDENT' | 'MANAGER'
    ): Promise<ResponseData<T>> {
        try {
            // get response
            const response = await AXIOS
                .get(`/course/${role.toLowerCase()}`)
                .then(res => res.data);

            // return
            return response;
        } catch (error) {
            // error
            if (error instanceof AxiosError) {
                return error.response?.data;
            }
            // other
            return {
                success: false,
                message: 'something went wrong'
            } as ResponseData<T>;
        }
    }

    // get by id 
    static async getDetail(id: string): Promise<ResponseData<CourseModel>> {
        try {
            // get response 
            const response = await AXIOS.get(`course/detail/${id}`).then(res => res.data);


            // return response 
            return response
        } catch (error) {
            // error axios 
            console.log(error)
            if (error instanceof AxiosError) return error.response?.data;

            // other 
            return {
                success: false,
                message: 'something went wrong'
            }
        }
    }

}