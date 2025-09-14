import type { ManagerResponse } from "../../models/manager-model";
import { ManagerService } from "../../services/manager.service";
import type { ResponseData } from "../../types/types";

export const loaderDataManager = async (): Promise<ResponseData<ManagerResponse>> => {
    try {
        // get service 
        const response = await ManagerService.getManager();


        // cek 
        if (!response.success) return response;

        // return 
        return response


    } catch (error) {
        // error
        console.log(error);
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}