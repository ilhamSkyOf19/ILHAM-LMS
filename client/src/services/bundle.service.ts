import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { BundleResponse } from "../models/bundle-model";
import type { ResponseData } from "../types/types";



export class BundleService {

    // get bundle 
    static async get(): Promise<ResponseData<BundleResponse>> {
        try {

            // get axios 
            const response = await AXIOS.get('/bundle/all')
                .then(res => res.data);

            // return 
            return response

        } catch (error) {
            // error 
            if (error instanceof AxiosError) {
                return error.response?.data
            }

            return {
                success: false,
                message: 'something went wrong'
            }
        }
    }

}