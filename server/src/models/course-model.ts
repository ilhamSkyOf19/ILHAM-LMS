import { Document, Types } from "mongoose";


// entity
export type CourseEntity = {
    name: string;
    thumbnail: string;
    tagline: string;
    description: string;
    price: number;
    manager: Types.ObjectId;
    category: Types.ObjectId;
    contents: Types.ObjectId[];
}


// model course 
export interface ICourse extends CourseEntity, Document { };


// create request
export type CourseCreateRequest = Omit<CourseEntity, "_id" | "manager" | "contents" | "category"> & {
    category: string;
}


// update request
export type CourseUpdateRequest = Partial<Omit<CourseCreateRequest, "manager" | "category" | "contents">>;


// response course
export type CourseResponse = {
    _id: string;
    name: string;
    thumbnail: string;
    tagline: string;
    description: string;
    price: number;
    manager: {
        _id: string;
    };
    category: {
        _id: string;
    };
    contents: {
        _id: string;
    }[]
}



// to response course
export const toCourseResponse = (
    course: CourseResponse): CourseResponse => {
    return {
        _id: course._id.toString(),
        name: course.name,
        thumbnail: course.thumbnail,
        tagline: course.tagline,
        description: course.description,
        price: course.price,
        manager: {
            _id: course.manager._id.toString(),
        },
        category: {
            _id: course.category._id.toString()
        },
        contents: course.contents ? course.contents.map(content => ({
            _id: content._id.toString()
        })) : [],
    }
}

