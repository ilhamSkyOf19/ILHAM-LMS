import { JWTPayloadType } from "../models/jwt-model";
import { CreateStudentRequest, IStudent, StudentResponse } from "../models/student-model";
import Student from "../schema/student-schema";
import { ResponseData, ResponseMessage } from "../types/types";
import bcrypt from "bcrypt";
import jwt, { SignCallback } from "jsonwebtoken";
import { StudentService } from "./student.service";
import tokenJWT from "../helper/token-jwt";
import { SigninRequest } from "../models/auth-model";
import Manager from "../schema/manager-schema";
import { Document, Model } from "mongoose";
import { IManager } from "../models/manager-model";


export class AuthService {

    // sign up 
    static async studentSignUp(req: CreateStudentRequest): Promise<ResponseData<string>> {
        // create 
        const student = await StudentService.create(req);

        // cek 
        if (!student) return {
            success: false,
            message: "student not created"
        }


        // get payload 
        const payload = {
            id: student._id.toString(),
            email: student.email,
            role: student.role
        } as JWTPayloadType;

        // generate 
        const token = tokenJWT({
            id: payload.id,
            email: payload.email,
            role: payload.role
        });

        // return 
        return {
            success: true,
            data: token
        }
    }







    // sign in 
    static async signIn<T extends IManager | IStudent>(req: SigninRequest, Model: Model<T>): Promise<ResponseData<string>> {

        // get student by email 
        const user = await Model.findOne({ email: req.email });

        // cek email
        if (!user) {
            return {
                success: false,
                message: "Invalid email or password"
            }
        }


        // get compare password
        const passwordMatch = await bcrypt.compare(req.password, user.password);

        // cek password

        if (!passwordMatch) return {
            success: false,
            message: "Invalid email or password"
        }

        // generate token 
        const token = tokenJWT({
            id: user.id,
            email: user.email,
            role: user.role
        });

        // return token 
        return {
            success: true,
            data: token
        }

    }

    //    manager
    static async managerSignIn(req: SigninRequest): Promise<ResponseData<string>> {

        // get manager by email 
        const manager = await Manager.findOne({ email: req.email });

        // cek email
        if (!manager) {
            return {
                success: false,
                message: "Invalid email or password"
            }
        }


        // get compare password
        const passwordMatch = await bcrypt.compare(req.password, manager.password);

        // cek password

        if (!passwordMatch) return {
            success: false,
            message: "Invalid email or password"
        }

        // generate token 
        const token = tokenJWT({
            id: manager.id,
            email: manager.email,
            role: manager.role
        });

        // return token 
        return {
            success: true,
            data: token
        }

    }
}