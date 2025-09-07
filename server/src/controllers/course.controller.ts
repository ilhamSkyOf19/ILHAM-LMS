import { Request, Response, NextFunction } from 'express';
import { CourseCreateRequest, CourseResponse } from '../models/course-model';
import { CourseService } from '../services/course.service';
import { ResponseData } from '../types/types';


export class CourseController {
    // create 
    static async create(req: Request<{ id: string }, {}, CourseCreateRequest>, res: Response<ResponseData<CourseResponse>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;


            // get params id 
            const id = req.params.id;


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
}