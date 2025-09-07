import { Request, Response, NextFunction } from 'express';
import { CreateManagerRequest, ManagerResponse, UpdateManagerRequest } from '../models/manager-model';
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

    // update 
    static async update(req: Request<{ id: string }, {}, UpdateManagerRequest>, res: Response<ResponseData<ManagerResponse>>, next: NextFunction) {
        try {
            // get params id 
            const id = req.params.id;


            // cek all req 
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    message: "Data Not Updated"
                })
            }


            // get service 
            const manager = await ManagerService.update(id, req.body);

            // return 
            return res.status(200).json({
                success: true,
                data: manager
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}