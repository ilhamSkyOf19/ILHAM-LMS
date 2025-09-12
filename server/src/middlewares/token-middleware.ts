import { Response, NextFunction } from "express";
import { JWTPayloadType, TokenRequest } from "../models/jwt-model";
import { ResponseMessage } from "../types/types";
import jwt from "jsonwebtoken";

const tokenMiddleware = (role: "STUDENT" | "MANAGER" | "ADMIN" | "ALL") => {
    return (
        req: TokenRequest,
        res: Response<ResponseMessage>,
        next: NextFunction,
    ) => {
        // get token 
        const token = req.cookies?.token as string;

        // cek token 
        if (!token) return res.status(401).json({
            success: false,
            message: "Unauthorized not token"
        });


        try {

            // get payload data 
            const payload = jwt.verify(token, process.env.JWT_SECRET || "") as JWTPayloadType;

            switch (role) {
                case "STUDENT":
                    if (payload.role !== "STUDENT") return res.status(401).json({
                        success: false,
                        message: "Unauthorized student"
                    })
                    break;
                case "MANAGER":
                    if (payload.role !== "MANAGER") return res.status(401).json({
                        success: false,
                        message: "Unauthorized manager"
                    })
                    break;
                case "ADMIN":
                    if (payload.role !== "ADMIN") return res.status(401).json({
                        success: false,
                        message: "Unauthorized admin"
                    })
                    break;
                case "ALL":
                    // cek all 
                    if (payload.role !== "STUDENT" && payload.role !== "MANAGER" && payload.role !== "ADMIN") return res.status(401).json({
                        success: false,
                        message: "Unauthorized all"
                    });
                    break;
                default:
                    break
            }


            // set request 
            req.data = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
                role: payload.role
            }

            // return next 
            next();

        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }



    }

};


export default tokenMiddleware;