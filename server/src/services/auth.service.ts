import { JWTPayloadType } from "../models/jwt-model";
import { CreateStudentRequest, IStudent } from "../models/student-model";
import { ResponseData, } from "../types/types";
import bcrypt from "bcrypt";
import tokenJWT from "../helper/token-jwt";
import { SigninRequest } from "../models/auth-model";
import Manager from "../schema/manager-schema";
import { Model } from "mongoose";
import { CreateManagerRequest, IManager } from "../models/manager-model";
import { CreateAdminRequest, IAdmin } from "../models/admin-mode";

// type sign up
type SignupMap = {
    student: { model: IStudent; req: CreateStudentRequest };
    manager: { model: IManager; req: CreateManagerRequest };
    admin: { model: IAdmin; req: CreateAdminRequest };
};




export class AuthService {

    // sign up 
    static async signup<K extends keyof SignupMap>(
        req: SignupMap[K]["req"],
        model: Model<SignupMap[K]["model"]>
    ): Promise<ResponseData<string>> {


        // hash password
        const passwordHash = await bcrypt.hash(req.password, 10);

        // set password
        req.password = passwordHash

        // create 
        const doc = await model.create(req);

        // cek 
        if (!model) return {
            success: false,
            message: "data not created"
        }


        // get payload 
        const payload = {
            id: doc.id,
            email: doc.email,
            role: doc.role
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
    static async signIn<T extends IManager | IStudent | IAdmin>(req: SigninRequest, Model: Model<T>): Promise<ResponseData<string>> {

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