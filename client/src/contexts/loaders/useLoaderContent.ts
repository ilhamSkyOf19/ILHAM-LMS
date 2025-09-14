import type { ContentResponse } from "../../models/content-model";
import { ContentService } from "../../services/content.service";
import type { ResponseData } from "../../types/types";

export const loaderContent = async (id_course: string): Promise<ResponseData<ContentResponse[]>> => {
    try {

        // get service 
        const response = await ContentService.get(id_course);


        // cek 
        if (!response.success) return {
            success: false,
            message: response.message
        };


        // return 
        return {
            success: true,
            data: response.data
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}


// content detail 
export const loaderContentDetail = async (id_content: string): Promise<ResponseData<ContentResponse>> => {
    try {

        // get service
        const response = await ContentService.getDetail(id_content);

        console.log('response', response);

        // cek 
        if (!response.success) return {
            success: false,
            message: response.message
        };

        // return 
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        // error
        console.log(error);
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}
