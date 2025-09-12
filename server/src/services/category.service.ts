import { promises } from "dns";
import { CategoryCreateRequest, CategoryOriginalResponse, CategoryResponse, toCategoryOriginalResponse, toCategoryResponse } from "../models/category-model";
import Category from "../schema/category-schema";
import { ResponseData } from "../types/types";

export class CategoryService {
    // create 
    static async create(req: CategoryCreateRequest): Promise<CategoryResponse> {
        // create category
        const category = await Category.create({
            ...req,
            courses: []
        });

        // convert ke plain object
        const response = category.toObject();

        return toCategoryResponse({
            ...response,
            _id: response._id as string,
            courses: []
        });
    }


    // get origina response 
    static async getAll(): Promise<ResponseData<CategoryOriginalResponse[]>> {

        // get all category 
        const category = await Category.find({}).lean<CategoryOriginalResponse[]>();

        // cek 
        if (!category) {
            return {
                success: false,
                message: 'category not found'
            }
        }


        return {
            success: true,
            data: category.map(category => toCategoryOriginalResponse(category))
        }
    }
}