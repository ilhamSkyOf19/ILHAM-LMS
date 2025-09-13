import type { ContentResponse } from "../../models/content-model";
import { ContentService } from "../../services/content.service";
import type { ResponseData } from "../../types/types";

const loaderContent = async (id_course: string): Promise<ResponseData<ContentResponse[]>> => {
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


// export 
export default loaderContent;