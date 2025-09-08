import { SigninRequest } from "../models/auth-model";
import Student from "../schema/student-schema";
import { AuthService } from "../services/auth.service";
import { ResponseMessage } from "../types/types";
import { Request, Response, NextFunction } from "express";


export class AuthController {
    // sign in 
    static async studentSignIn(req: Request<{}, {}, SigninRequest>, res: Response<ResponseMessage>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;

            // signin student 
            const response = await AuthService.signIn(body, Student);

            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }

            // set cookie 
            res.cookie('token', response.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 1000
            })


            // return 
            return res.status(200).json({
                success: true,
                message: "student signed in"
            })


        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}