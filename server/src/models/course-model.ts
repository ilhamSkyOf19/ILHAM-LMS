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
export type CourseUpdateRequest = Partial<Omit<CourseCreateRequest, "manager" | "contents">>;


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
            _id: course.category._id.toString(),
        },
        contents: course.contents ? course.contents.map(content => ({
            _id: content._id.toString()
        })) : [],
    }
}



// course all response 
export type CourseAllResponse = {
    _id: string;
    name: string;
    thumbnail: string;
    tagline: string;
    description: string;
    price: number;
    manager: {
        _id: string;
        name: string;
    };
    category: {
        _id: string;
        name: string;
    };
    contents: {
        _id: string;
    }[]
}


// to all response
export const toAllCourseResponse = (
    course: CourseAllResponse): CourseAllResponse => {
    return {
        _id: course._id.toString(),
        name: course.name,
        thumbnail: course.thumbnail,
        tagline: course.tagline,
        description: course.description,
        price: course.price,
        manager: {
            _id: course.manager._id.toString(),
            name: course.manager.name
        },
        category: {
            _id: course.category._id.toString(),
            name: course.category.name
        },
        contents: course.contents ? course.contents.map(content => ({
            _id: content._id.toString()
        })) : [],
    }
}