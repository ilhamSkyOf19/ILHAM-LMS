import { Document, Types } from "mongoose";

// entity
export interface CategoryEntity {
    name: string;
    courses: Types.ObjectId[]
}


// category model
export interface ICategory extends Document, CategoryEntity { };


// create 
export type CategoryCreateRequest = Omit<CategoryEntity, "_id" | "courses">;


// update 
export type CategoryUpdateRequest = Partial<CategoryEntity>;



// export response 
export type CategoryResponse = {
    _id: string,
    name: string,
    courses: { _id: string }[]
}


// to response
export const toCategoryResponse = (category: CategoryResponse): CategoryResponse => {
    return {
        _id: category._id.toString(),
        name: category.name,
        courses: category.courses ? category.courses.map(item => ({
            _id: item._id.toString()
        })) : []
    }
}



