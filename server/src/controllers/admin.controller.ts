import { Request, Response, NextFunction } from "express";
import { CreateAdminRequest } from "../models/admin-mode";
import { ResponseData } from "../types/types";
import { AuthService } from "../services/auth.service";
import Admin from "../schema/admin-schema";

export class AdminController {
    // create 
    static async create(req: Request<{}, {}, CreateAdminRequest>, res: Response<ResponseData<string>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;



            // create 
            const admin = await AuthService.signup<"admin">(body, Admin);


            // cek response 
            if (!admin.success) {
                return res.status(400).json(admin)
            }

            // set cookie 
            res.cookie('token', admin.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 1000
            })

            // return 
            return res.status(201).json({
                success: true,
                data: "admin created & logged in"
            });


        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}