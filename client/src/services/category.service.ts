import AXIOS from "../lib/axios";
import type { CategoryOriginalResponse } from "../models/category-model";
import type { ResponseData } from "../types/types";

export class CategoryService {
    // get 
    static async getCategory(): Promise<ResponseData<CategoryOriginalResponse>> {

        // get response 
        const response = await AXIOS.get('/category/all').then(res => res.data);

        // return response 
        return response
    }
}