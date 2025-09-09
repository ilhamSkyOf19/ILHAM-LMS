import { Request, Response, NextFunction } from "express";
import { BundleResponse, CreateBundleRequest } from "../models/bundle-model";
import { ResponseData } from "../types/types";
import { BundleService } from "../services/bundle.service";

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
}