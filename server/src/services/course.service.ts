import { CourseCreateRequest, CourseResponse, toCourseResponse } from "../models/course-model";
import Course from "../schema/course-schema";
import Manager from "../schema/manager-schema";
import { ResponseData } from "../types/types";

export class CourseService {
    // create 
    static async create(req: CourseCreateRequest, managerId: string): Promise<ResponseData<CourseResponse>> {

        // cek manager
        const manager = await Manager.findById(managerId);

        // cek 
        if (!manager) {
            return {
                success: false,
                message: 'manager not found'
            }
        };

        // cek limit course 
        if (manager.limit_course === 0) {
            return {
                success: false,
                message: 'limit course reached'
            }
        }


        // cek category


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
}