import { Request, Response, NextFunction } from 'express';
import { CourseAllResponse, CourseCreateRequest, CourseResponse, CourseUpdateRequest } from '../models/course-model';
import { CourseService } from '../services/course.service';
import { ResponseData, ResponseMessage } from '../types/types';
import { TokenRequest } from '../models/jwt-model';


export class CourseController {
    // create 
    static async create(req: TokenRequest<{}, {}, CourseCreateRequest>, res: Response<ResponseData<CourseResponse>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;


            // get data id 
            const { id } = req.data ?? { id: '' };


            // get service
            const course = await CourseService.create(body, id);

            // cek response 
            if (!course.success) {
                return res.status(400).json(course)
            }




            // return 
            return res.status(201).json(course);



        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // get all course 
    static async getAll(_req: Request, res: Response<ResponseData<CourseAllResponse[]>>, next: NextFunction) {
        try {

            // get service 
            const course = await CourseService.getAll();

            // cek status
            if (!course.success) {
                return res.status(400).json(course)
            }


            // cek data 
            if (course.data.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'course empty'
                })
            }

            // return response 
            return res.status(200).json(course)
        } catch (error) {
            // error handle
            console.log(error);
            next(error)
        }
    }

    // delete
    static async delete(req: TokenRequest<{ id: string }>, res: Response<ResponseMessage>, next: NextFunction) {
        try {

            // get id manager
            const { id: manager } = req.data ?? { id: '' };

            // get params id 
            const id = req.params.id;


            // delete course
            const response = await CourseService.delete(id, manager);


            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }


            // return
            return res.status(200).json({
                success: true,
                message: "course deleted"
            })

        } catch (error) {
            // error handle 
            console.log(error);
            next(error)
        }
    }

    // update 
    static async update(req: TokenRequest<{ id: string }, {}, CourseUpdateRequest>, res: Response<ResponseData<CourseResponse>>, next: NextFunction) {
        try {
            // get params id
            const id = req.params.id;

            // get id manager 
            const { id: manager } = req.data ?? { id: '' };

            // get body 
            const body = req.body;

            // get service 
            const course = await CourseService.update(id, manager, body);

            // cek response 
            if (!course.success) {
                return res.status(400).json(course)
            }

            // return
            return res.status(200).json(course)
        } catch (error) {
            // error handle 
            console.log(error);
            next(error)
        }
    }


    // get course by id manager 
    static async getCourseManager(req: TokenRequest, res: Response<ResponseData<CourseResponse[]>>, next: NextFunction) {
        try {

            // get id manager 
            const { id: manager } = req.data ?? { id: '' };

            // get service 
            const course = await CourseService.getByManager(manager);

            // cek response 
            if (!course.success) {
                return res.status(400).json(course)
            }

            // return
            return res.status(200).json(course)

        } catch (error) {
            // error handle 
            console.log(error);
            next(error)
        }
    }

}