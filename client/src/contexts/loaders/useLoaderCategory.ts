import { AxiosError } from "axios";
import type { CategoryOriginalResponse } from "../../models/category-model";
import { CategoryService } from "../../services/category.service";
import type { ResponseData } from "../../types/types";

const loaderCategory = async (): Promise<ResponseData<CategoryOriginalResponse>> => {
    try {

        // get response 
        const response = await CategoryService.getCategory();

        // cek 
        if (!response.success) return response;

        // return response 
        return response

    } catch (error) {
        console.log(error);
        // cek error axios 
        if (error instanceof AxiosError) {
            return {
                success: false,
                message: error.response?.data.message
            }
        }
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}

// export 
export default loaderCategory