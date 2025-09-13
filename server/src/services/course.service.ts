import path from "path";
import { BundleEntity } from "../models/bundle-model";
import { CourseAllResponse, CourseCreateRequest, CourseResponse, CourseUpdateRequest, toAllCourseResponse, toCourseResponse } from "../models/course-model";
import { ManagerEntity, ManagerResponse } from "../models/manager-model";
import Category from "../schema/category-schema";
import Course from "../schema/course-schema";
import Manager from "../schema/manager-schema";
import TransactionBundle from "../schema/transaction-bundle-schema";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class CourseService {
    // create 
    static async create(req: CourseCreateRequest, managerId: string, thumbnail: string, url_thumbnail: string): Promise<ResponseData<CourseResponse>> {



        // cek manager
        const manager = await Manager.findById(managerId).lean<ManagerResponse>();

        // cek 
        if (!manager) {
            return {
                success: false,
                message: 'manager not found'
            }
        };


        // cek transaction bundle 
        const bundle = await TransactionBundle.findOne({
            manager: manager._id,
            status: 'success'
        }).populate<{ bundle: BundleEntity }>('bundle').lean<{ bundle: BundleEntity }>();




        // cek limit course 
        if (!bundle) {
            return {
                success: false,
                message: 'Buy a bundle first'
            }
        } else {
            if (manager.courses.length >= bundle.bundle.limit_course) {
                return {
                    success: false,
                    message: 'limit course reached'
                }
            }
        }


        // cek category
        const category = await Category.findById(req.category);


        // cek 
        if (!category) {
            return {
                success: false,
                message: 'category not found'
            }
        };



        // create cours
        const doc = await Course.create({
            ...req,
            manager: managerId,
            thumbnail: thumbnail,
            url_thumbnail: url_thumbnail
        });



        // convert ke plain object
        const response = doc.toObject()

        // return 
        return {
            success: true,
            data: toCourseResponse({
                ...response,
                _id: response._id as string,
                url_thumbnail: url_thumbnail,
                manager: {
                    _id: response.manager._id.toString(),
                },
                category: {
                    _id: response.category._id.toString(),
                },
                contents: []
            })
        };

    }


    // get course 
    static async getAll(): Promise<ResponseData<CourseAllResponse[]>> {
        // get all course
        const course = await Course.find({})
            .populate('manager', 'name')
            .populate('category', '-courses')
            .lean<CourseAllResponse[]>();

        if (!course) {
            return {
                success: false,
                message: 'course not found'
            }
        }

        return {
            success: true,
            data: course.map(course => toAllCourseResponse(course))
        }
    }


    // get detail by manager 
    static async getByManager(manager: string): Promise<ResponseData<CourseResponse[]>> {
        try {

            // get response
            const response = await Course.find({ manager: manager })
                .populate('category', '-courses')
                .lean<CourseResponse[]>();

            // cek
            if (!response) {
                return {
                    success: false,
                    message: 'course not found'
                }
            }

            // return
            return {
                success: true,
                data: response
            }
        } catch (error) {
            // error handle
            console.log(error);
            return {
                success: false,
                message: 'course not found'
            }
        }
    }


    // get detail
    static async geCourseDetail(idCourse: string): Promise<ResponseData<CourseResponse>> {

        // get course 
        const response = await Course.findOne({
            _id: idCourse
        })
            .populate('category', '-courses')
            .lean<CourseResponse>();

        // cek 
        if (!response) {
            return {
                success: false,
                message: 'Course not found'
            }
        }

        // return 
        return {
            success: true,
            data: response
        }


    }


    // delete course 
    static async delete(id: string, manager: string): Promise<ResponseMessage> {

        // cek course 
        const course = await Course.findById(id);

        // cek 
        if (!course) {
            return {
                success: false,
                message: 'course not found'
            }
        }


        // cek manager 
        if (course.manager.toString() !== manager) {
            return {
                success: false,
                message: 'unauthorized'
            }
        }

        // delete thumbnail
        const deleteThumbnail = await FileService.deleteFileFormPath(course.thumbnail, 'file');


        // cek delete thumbnail
        if (!deleteThumbnail) {
            return {
                success: false,
                message: 'failed to delete thumbnail'
            }
        }

        // delete data
        const response = await Course.findOneAndDelete({ _id: id });

        // cek response 
        if (!response) {
            return {
                success: false,
                message: 'course not found'
            }
        }

        // return response 
        return {
            success: true,
            message: 'course deleted'
        }

    }

    // update course 
    static async update(params: { id: string, manager: string, fileName: string, url_thumbnail: string }, req: CourseUpdateRequest): Promise<ResponseData<CourseResponse>> {
        console.log(params);
        console.log(req);
        // cek course 
        const course = await Course.findById({
            _id: params.id
        });

        // cek 
        if (!course) {
            return {
                success: false,
                message: 'course not found service'
            }
        }

        // cek manager 
        if (course.manager.toString() !== params.manager) {
            return {
                success: false,
                message: 'unauthorized'
            }
        }

        // cek the same category
        if (req.category) {
            if (course.category._id.toString() !== req.category) {
                // delete category old in course 
                await Category.findByIdAndUpdate({
                    _id: course.category
                }, {
                    $pull: {
                        courses: course._id
                    }
                })
            }
        }


        if (req.category !== '' && req.category !== undefined) {
            // cek category 
            const category = await Category.findById(req.category);

            // cek 
            if (!category) {
                return {
                    success: false,
                    message: 'category not found service'
                }
            }
        }



        // update data
        const response = await Course.findOneAndUpdate({ _id: params.id }, {
            thumbnail: params.fileName ? params.fileName : course.thumbnail,
            url_thumbnail: params.url_thumbnail ? params.url_thumbnail : course.url_thumbnail,
            name: req.name ? req.name : course.name,
            tagline: req.tagline ? req.tagline : course.tagline,
            description: req.description ? req.description : course.description,
            price: req.price ? req.price : course.price,
            category: req.category ? req.category : course.category
        }).lean<CourseResponse>();


        console.log(response);

        // cek response 
        if (!response) {
            return {
                success: false,
                message: 'course not found service'
            }
        }


        // return response 
        return {
            success: true,
            data: toCourseResponse(response)
        }

    }
}