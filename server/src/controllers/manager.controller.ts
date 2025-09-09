import { Request, Response, NextFunction } from 'express';
import { CreateManagerRequest, ManagerResponse, UpdateManagerRequest } from '../models/manager-model';
import { ResponseData, ResponseMessage } from '../types/types';
import { ManagerService } from '../services/manager.service';
import { AuthService } from '../services/auth.service';
import Manager from '../schema/manager-schema';
import { TokenRequest } from '../models/jwt-model';

export class ManagerController {


    // get detail
    static async getDetail(req: TokenRequest, res: Response<ResponseData<ManagerResponse>>, next: NextFunction) {
        try {

            // get id manager 
            const { id } = req.data ?? { id: '' };

            // get service 
            const manager = await ManagerService.getDetail(id);

            // cek service 
            if (!manager) {
                return res.status(400).json({
                    success: false,
                    message: "manager not found"
                })
            }

            // return
            return res.status(200).json({
                success: true,
                data: manager
            })

        } catch (error) {
            // error handle 
            console.log(error);
            next(error)
        }
    }

    // create 
    static async create(req: Request<{}, {}, CreateManagerRequest>, res: Response<ResponseData<string>>, next: NextFunction) {
        try {

            // get body 
            const body = req.body;


            // get service
            const manager = await AuthService.signup<"manager">(body, Manager)

            // cek service 
            if (!manager.success) {
                return res.status(400).json(manager)
            }


            // set cookie 
            res.cookie('token', manager.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 1000
            })

            // return 
            return res.status(201).json({
                success: true,
                data: "manager created & logged in"
            })


        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // update 
    static async update(req: TokenRequest<{}, {}, UpdateManagerRequest>, res: Response<ResponseData<ManagerResponse>>, next: NextFunction) {
        try {
            // get id manager
            const { id } = req.data ?? { id: '' };


            // cek all req 
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    message: "Data Not Updated"
                })
            }


            // get service 
            const manager = await ManagerService.update(id, req.body);

            if (!manager.success) {
                return res.status(400).json(manager)
            }


            // return 
            return res.status(200).json(manager)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // delete 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseMessage>, next: NextFunction) {
        try {
            // get params id 
            const id = req.params.id;



            // delete manager
            const response = await ManagerService.delete(id);


            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }

            // return
            return res.status(200).json({
                success: true,
                message: "manager deleted"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}