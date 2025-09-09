import { Request, Response, NextFunction } from 'express';
import { ContentResponse, CreateContentRequest } from '../models/content-model';
import { ResponseData } from '../types/types';
import { ContentService } from '../services/content.service';
import { TokenRequest } from '../models/jwt-model';

export class ContentController {
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
}