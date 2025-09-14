import AXIOS from "../lib/axios";
import type { ManagerResponse } from "../models/manager-model";
import type { ResponseData } from "../types/types";

export class ManagerService {

    // get manager 
    static async getManager(): Promise<ResponseData<ManagerResponse>> {
        // get response axios
        const response = await AXIOS.get(`/manager/detail`).then(res => res.data);
        // return response axios
        return response
    }
}