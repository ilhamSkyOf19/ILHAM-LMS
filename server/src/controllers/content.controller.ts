import { Request, Response, NextFunction } from 'express';
import { ContentResponse, ContentResponseAll, CreateContentRequest, UpdateContentRequest } from '../models/content-model';
import { ResponseData } from '../types/types';
import { ContentService } from '../services/content.service';
import { TokenRequest } from '../models/jwt-model';

export class ContentController {


    // get all 
    static async getAll(req: Request<{ idCourse: string }>, res: Response<ResponseData<ContentResponseAll[]>>, next: NextFunction) {
        try {
            // get params 
            const idCourse = req.params.idCourse;


            // get service 
            const content = await ContentService.getAll(idCourse);


            // cek response 
            if (!content.success) {
                return res.status(400).json(content)
            }


            // return response 
            return res.status(200).json(content);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    // get detail content 
    static async getDetail(req: Request<{ idContent: string }>, res: Response<ResponseData<ContentResponseAll>>, next: NextFunction) {
        try {

            // get params 
            const idContent = req.params.idContent;


            // get service 
            const response = await ContentService.getDetail(idContent);

            // cek response
            if (!response.success) {
                return res.status(400).json(response)
            }


            // return 
            return res.status(200).json(response)

        } catch (error) {
            // error handle
            console.log(error);
            next(error)
        }
    }

    // create 
    static async create(req: TokenRequest<{ idCourse: string }, {}, CreateContentRequest>, res: Response<ResponseData<ContentResponse>>, next: NextFunction) {
        try {
            // get params 
            const idCourse = req.params.idCourse;


            // get id manager 
            const { id: manager } = req.data ?? { id: '' };



            // get body 
            const body = req.body;



            // cek type
            if (body.type === 'video') {
                if (!body.videoId) {
                    return res.status(400).json({
                        success: false,
                        message: "Type video must have videoId"
                    })
                }
            } else {
                if (!body.text) {
                    return res.status(400).json({
                        success: false,
                        message: "Type text must have text"
                    })
                }
            }



            // get service 
            const content = await ContentService.create(idCourse, manager, body);


            // cek response 
            if (!content.success) {
                return res.status(400).json(content)
            }

            // return 
            return res.status(201).json(content);

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    // update content
    static async edit(req: Request<{ idContent: string }, {}, UpdateContentRequest>, res: Response<ResponseData<UpdateContentRequest>>, next: NextFunction) {
        try {
            // get params content 
            const idContent = req.params.idContent;


            // get body 
            const body = req.body;

            // cek type body
            if (body.type) {
                if (body.type === 'video') {
                    if (!body.videoId) {
                        return res.status(400).json({
                            success: false,
                            message: "Type video must have videoId"
                        })
                    } else {
                        body.text = null
                    }
                } else {
                    if (!body.text) {
                        return res.status(400).json({
                            success: false,
                            message: "Type text must have text"
                        })
                    } else {
                        body.videoId = null
                    }
                }
            }



            // get service
            const content = await ContentService.edit(idContent, body);


            // cek response 
            if (!content.success) {
                return res.status(400).json(content)
            }

            // return 
            return res.status(200).json(content);


        } catch (error) {
            // error handler
            console.log(error);
            next(error)
        }
    }
}