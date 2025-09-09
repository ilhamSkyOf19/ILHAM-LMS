import { Request, Response, NextFunction } from "express";
import { BundleResponse, CreateBundleRequest, UpdateBundleRequest } from "../models/bundle-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { BundleService } from "../services/bundle.service";
import { fi } from "zod/v4/locales/index.cjs";

export class bundleController {
    // create 
    static async create(req: Request<{}, {}, CreateBundleRequest>, res: Response<ResponseData<BundleResponse>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;


            // get service 
            const bundle = await BundleService.create(body);

            // cek response 
            if (!bundle) {
                return res.status(400).json({
                    success: false,
                    message: "bundle not found"
                })
            }

            // return 
            return res.status(201).json({
                success: true,
                data: bundle
            });

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    // update bundle
    static async update(req: Request<{ id: string }, {}, UpdateBundleRequest>, res: Response<ResponseData<BundleResponse>>, next: NextFunction) {
        try {
            // get params id
            const id = req.params.id;


            // get service 
            const response = await BundleService.update(id, req.body);


            // cek response 
            if (!response.success) {
                res.status(400).json(response)
            }

            // return 
            return res.status(200).json(response)
        } catch (error) {
            // error handler
            console.log(error);
            next(error)
        }
    }


    // get all bundle 
    static async getAll(_req: Request, res: Response<ResponseData<BundleResponse[]>>, next: NextFunction) {
        try {
            // get service
            const bundle = await BundleService.getAll();

            // cek response 
            if (!bundle.success) {
                return res.status(400).json(bundle)
            }

            // return 
            return res.status(200).json(bundle)
        } catch (error) {
            // error handler
            console.log(error);
            next(error)
        }
    }


    // bundle delete 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseMessage>, next: NextFunction) {
        try {
            // get params id
            const { id } = req.params;

            // get service 
            const response = await BundleService.delete(id);


            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }

            // return 
            return res.status(200).json(response)
        } catch (error) {
            // error handler
            console.log(error);
            next(error)

        }
    }
}