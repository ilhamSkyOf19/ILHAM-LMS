import { BundleEntity } from "../models/bundle-model";
import { CourseAllResponse, CourseCreateRequest, CourseResponse, CourseUpdateRequest, toAllCourseResponse, toCourseResponse } from "../models/course-model";
import { ManagerEntity, ManagerResponse } from "../models/manager-model";
import Category from "../schema/category-schema";
import Course from "../schema/course-schema";
import Manager from "../schema/manager-schema";
import TransactionBundle from "../schema/transaction-bundle-schema";
import { ResponseData, ResponseMessage } from "../types/types";

export class CourseService {
    // create 
    static async create(req: CourseCreateRequest, managerId: string): Promise<ResponseData<CourseResponse>> {

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
            id_manager: manager._id,
            status: 'success'
        }).populate<{ id_bundle: BundleEntity }>('id_bundle').lean<{ id_bundle: BundleEntity }>();





        // cek limit course 
        if (!bundle) {
            return {
                success: false,
                message: 'Buy a bundle first'
            }
        } else {
            if (manager.courses.length >= bundle.id_bundle.limit_course) {
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
            manager: managerId
        });

        // convert ke plain object
        const response = doc.toObject();

        // return 
        return {
            success: true,
            data: toCourseResponse({
                ...response,
                _id: response._id as string,
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
    static async update(id: string, manager: string, req: CourseUpdateRequest): Promise<ResponseData<CourseResponse>> {

        // cek course 
        if (req.category) {

        }
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

        // cek the same category
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

        if (req.category) {
            // cek category 
            const category = await Category.findById(req.category);

            // cek 
            if (!category) {
                return {
                    success: false,
                    message: 'category not found'
                }
            }
        }


        // update data
        const response = await Course.findOneAndUpdate({ _id: id }, req, { new: true }).lean<CourseResponse>();

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
            data: toCourseResponse(response)
        }

    }
}