import { Request, Response, NextFunction } from "express";
import { CategoryCreateRequest, CategoryOriginalResponse, CategoryResponse } from "../models/category-model";
import { ResponseData } from "../types/types";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    // create 
    static async create(
        req: Request<{}, {}, CategoryCreateRequest>,
        res: Response<ResponseData<CategoryResponse>>,
        next: NextFunction) {

        try {
            // get body 
            const body = req.body;

            // create category 
            const category = await CategoryService.create(body);


            // return 
            return res.status(201).json({
                success: true,
                data: category
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    // get all category 
    static async getAll(req: Request, res: Response<ResponseData<CategoryOriginalResponse[]>>, next: NextFunction) {
        try {
            // get all category 
            const category = await CategoryService.getAll();

            // return 
            return res.status(200).json(category)


        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}