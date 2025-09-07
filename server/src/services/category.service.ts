import { CategoryCreateRequest, CategoryResponse, toCategoryResponse } from "../models/category-model";
import Category from "../schema/category-schema";

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
}