import { Request, Response, NextFunction } from 'express';
import { CreateManagerRequest, ManagerResponse } from '../models/manager-model';
import { ResponseData } from '../types/types';
import bcrypt from 'bcrypt';
import { ManagerService } from '../services/manager.service';

export class ManagerController {

    // create 
    static async create(req: Request<{}, {}, CreateManagerRequest>, res: Response<ResponseData<ManagerResponse>>, next: NextFunction) {
        try {

            // get body 
            const body = req.body;


            // get service
            const manager = await ManagerService.create({
                ...body,
            });

            // return 
            return res.status(201).json({
                success: true,
                data: manager
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}