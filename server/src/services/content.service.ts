import { ContentResponse, ContentResponseAll, CreateContentRequest, toContentResponse, toContentResponseAll, UpdateContentRequest } from "../models/content-model";
import Content from "../schema/content-schema";
import Course from "../schema/course-schema";
import { ResponseData } from "../types/types";

export class ContentService {

    // get content 
    static async getAll(idCourse: string): Promise<ResponseData<ContentResponseAll[]>> {

        // get content 
        const content = await Content.find({
            course: idCourse
        }).lean<ContentResponseAll[]>();

        // cek content 
        if (!content) {
            return {
                success: false,
                message: 'content not found'
            }
        }


        // return 
        return {
            success: true,
            data: content.map(content => toContentResponseAll(content))
        }


    }
    // create 
    static async create(idCourse: string, manager: string, req: CreateContentRequest): Promise<ResponseData<ContentResponse>> {
        // course 
        const course = await Course.findById(idCourse);


        // cek course 
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

        // create content 
        const content = await Content.create({
            ...req,
            course: course._id
        });


        // convert to object 
        const response = content.toObject();

        // return 
        return {
            success: true,
            data: toContentResponse({
                ...response,
                _id: response._id.toString(),
                course: response.course.toString()
            })
        };
    }

    // edit content 
    static async edit(idContent: string, req: UpdateContentRequest): Promise<ResponseData<ContentResponse>> {

        // get content 
        const contennt = await Content.findById(idContent);


        // cek 
        if (!contennt) {
            return {
                success: false,
                message: 'content not found'
            }
        }


        // get response 
        const doc = await Content.findByIdAndUpdate(idContent, req, {
            new: true
        })

        // cek doc 
        if (!doc) {
            return {
                success: false,
                message: 'content not found'
            }
        }




        return {
            success: true,
            data: toContentResponse({
                ...doc.toObject(),
                _id: doc._id.toString(),
                course: doc.course.toString()
            })
        }

    }
}