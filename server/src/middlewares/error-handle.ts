import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ResponseMessage } from "../types/types";
import multer from "multer";

const errorHandle = (
    err: unknown | any,
    _req: Request,
    res: Response<ResponseMessage>,
    _next: NextFunction
) => {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: `Invalid value for field '${err.path}'`
        });
    }

    if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).json({
            success: false,
            message: "Record not found"
        });
    }

    if ((err as any).code === 11000) {
        if (Object.keys((err as any).keyValue).includes("email")) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        } else if (Object.keys((err as any).keyValue).includes("name")) {
            return res.status(409).json({
                success: false,
                message: "Name already exists",
            });
        } else {
            return res.status(409).json({
                success: false,
                message: "Value already exists",
            });
        }
    }

    // error multer

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File too large. Max 2MB allowed"
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // error custom dari fileFilter
    if (err.message === "Invalid file type") {
        return res.status(400).json({
            success: false,
            message: "Only .jpg, .jpeg, .png allowed"
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default errorHandle;
