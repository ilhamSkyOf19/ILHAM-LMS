import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { ResponseData } from "../types/types";

export class CourseService {
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

}