import { Response, NextFunction } from "express";
import { TokenRequest } from "../models/jwt-model";
import { ResponseData } from "../types/types";
import { CreateTransactionBundleRequest } from "../models/transaction-bundle-model";
import { TransactionBundleService } from "../services/transaction-bundle.service";

export class TransactionBundleController {
    // create 
    static async create(req: TokenRequest<{}, {}, Omit<CreateTransactionBundleRequest, "id_manager">>, res: Response<ResponseData<string>>, next: NextFunction) {



        try {
            // get data token 
            const { id } = req.data ?? { id: '' };


            // get body 
            const body = req.body;


            // get service 
            const response = await TransactionBundleService.create({
                ...body,
                id_manager: id
            });


            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }

            // response 
            return res.status(200).json(response)
        } catch (error) {
            // error handler 
            console.log(error);
            next(error)
        }


    }



}