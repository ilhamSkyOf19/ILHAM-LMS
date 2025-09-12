import { ZodError, ZodType } from "zod";
import { NextFunction, Request, Response } from "express";
import { ResponseMessage } from "../types/types";



const ValidationRequest = <T>(
    schema: ZodType<T>,
) => {
    return async (req: Request<{}, {}, T>, res: Response<ResponseMessage>, next: NextFunction) => {
        try {

            // cek request body 
            if (!req.body) return res.status(400).json({
                success: false,
                message: "Invalid Request"
            })

            // cek schema 
            schema.parse(req.body)

            //  next
            return next()

        } catch (error) {
            // cek error 
            console.log(error)
            // error validation 
            if (error instanceof ZodError) {
                // error message
                const errorMessages = error.issues.map((err) => err.message)[0];

                // return error
                return res.status(400).json({
                    success: false,
                    message: errorMessages,
                });
            }

            // error other
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
}


export default ValidationRequest;