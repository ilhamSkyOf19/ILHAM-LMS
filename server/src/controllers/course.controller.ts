import { Request, Response, NextFunction } from 'express';
import { CourseAllResponse, CourseCreateRequest, CourseResponse, CourseUpdateRequest } from '../models/course-model';
import { CourseService } from '../services/course.service';
import { ResponseData, ResponseMessage } from '../types/types';
import { TokenRequest } from '../models/jwt-model';
import { CourseValidation } from '../validation/course-validation';
import validationService from '../services/validation.service';
import { FileService } from '../services/file.service';
import path from 'path';
import Course from '../schema/course-schema';
import { error } from 'console';
import { unknown, ZodError } from 'zod';


export class CourseController {
    // create 
    static async create(req: TokenRequest<{}, {}, CourseCreateRequest>, res: Response<ResponseData<CourseResponse>>, next: NextFunction) {
        try {


            // cek validation 
            const body = validationService<CourseCreateRequest>(CourseValidation.CREATE, req.body);

            // cek validation 
            if (!body.success) {
                // cek file request
                if (req.file) {
                    await FileService.deleteFileRequest(req.file.path)
                }

                return res.status(400).json(body)
            }



            // get data id 
            const { id } = req.data ?? { id: '' };

            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            // generate
            const url_thumbnail = `${baseUrl}/uploads/file/${req.file?.filename}`;



            // get service
            const course = await CourseService.create(
                { ...body.data },
                id,
                req.file?.filename ?? '',
                url_thumbnail);

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
    static async update(req: TokenRequest<{ id: string }, {}, Omit<CourseUpdateRequest, 'thumbnail'>>, res: Response<ResponseData<CourseResponse>>, next: NextFunction) {
        try {
            // get params id
            const id = req.params.id;

            // get id manager 
            const { id: manager } = req.data ?? { id: '' };




            // cek validation
            const body = validationService<CourseUpdateRequest>(CourseValidation.UPDATE, {
                ...req.body,
                price: Number(req.body.price)
            });

            // cek body 
            if (!body.success) {
                // hapus file
                if (req.file) await FileService.deleteFileRequest(req.file.path);

                return res.status(500).json({
                    success: false,
                    message: body.message
                });
            }


            // cek course 
            const course = await Course.findById({ _id: id }).populate('category', 'name');


            // cek
            if (!course) {
                // cek file 
                if (req.file) await FileService.deleteFileRequest(req.file.path);
                return res.status(400).json({
                    success: false,
                    message: 'course not found ini'
                })
            }





            // cek file
            if (req.file) {
                // delete file
                // masuk
                console.log('masuk 2');

                const deleteThumbnail = await FileService.deleteFileFormPath(course.thumbnail, 'file');

                // cek 
                if (!deleteThumbnail.success) {
                    return res.status(400).json({
                        success: false,
                        message: deleteThumbnail.message
                    })
                }
            }

            // lanjut
            console.log('lanjut');

            // generate base 
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            // generate url 
            const url_thumbnail = `${baseUrl}/uploads/file/${req.file?.filename}`;

            // get service 
            const response = await CourseService.update(
                {
                    id,
                    manager,
                    fileName: req.file ? req.file.filename : '',
                    url_thumbnail: req.file ? url_thumbnail : ''
                },
                { ...body.data, price: Number(body.data.price) });

            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }




            // return
            return res.status(200).json(response)
        } catch (error) {
            // error handle 
            console.log(error);
            next(error);
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



    // get detail 
    static async getCourseDetail(req: Request<{ id: string }>, res: Response<ResponseData<CourseResponse>>, next: NextFunction) {
        try {


            // get params id 
            const id = req.params.id;


            // get service 
            const response = await CourseService.geCourseDetail(id);


            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }

            // return 
            return res.status(200).json(response)


        } catch (error) {
            // erro handle 
            console.log(error);
            next(error)
        }
    }

}