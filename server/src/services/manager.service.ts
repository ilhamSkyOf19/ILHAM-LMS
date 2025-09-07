import { CreateManagerRequest, ManagerResponse, toManagerResponse, UpdateCourseManagerRequest, UpdateManagerRequest } from "../models/manager-model";
import Manager from "../schema/manager-schema";

import bcrypt from 'bcrypt';
import { ResponseData, ResponseMessage } from "../types/types";
export class ManagerService {
    // create 
    static async create(req: CreateManagerRequest): Promise<ManagerResponse> {

        // hash password
        const passwordHash = await bcrypt.hash(req.password, 10);

        // create data
        const doc = await Manager.create({
            ...req,
            password: passwordHash,
            courses: [],
            limit_course: 0
        });


        // get response 
        const response = doc.toObject();


        // return data
        return toManagerResponse(
            {
                ...response,
                _id: response._id as string,
                avatarUrl: response.avatar,
                courses: []
            })
    }

    // update manager
    static async update(id: string, req: UpdateManagerRequest): Promise<ResponseData<ManagerResponse>> {

        // cek password 
        if (req.password) {
            // hash password
            const passwordHash = await bcrypt.hash(req.password, 10);
            req.password = passwordHash;
        }

        // update data 
        const response = await Manager.findByIdAndUpdate(
            id,
            req,
            {
                new: true
            }
        ).lean<ManagerResponse>();

        // check 
        if (!response) {
            return {
                success: false,
                message: 'manager not found'
            }
        };


        return {
            success: true,
            data: toManagerResponse({
                ...response,
                _id: response._id as string,
                avatarUrl: response.avatar
            })
        }
    }

    // delete manager 
    static async delete(id: string): Promise<ResponseMessage> {
        // delete data 
        const response = await Manager.findByIdAndDelete(id);


        // cek response 
        if (!response) {
            return {
                success: false,
                message: 'manager not found'
            }
        }


        // response 
        return {
            success: true,
            message: 'manager deleted'
        }
    }
}