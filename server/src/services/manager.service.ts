import { ManagerResponse, toManagerResponse, UpdateManagerRequest } from "../models/manager-model";
import Manager from "../schema/manager-schema";

import bcrypt from 'bcrypt';
import { ResponseData, ResponseMessage } from "../types/types";
export class ManagerService {
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
        const response = await Manager.findOneAndDelete({
            _id: id
        });


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

    // get detail manager 
    static async getDetail(id: string): Promise<ManagerResponse> {

        // get data 
        const response = await Manager.findById({ _id: id })
            .populate('courses')
            .populate('bundle', '-createdAt -updatedAt -__v')
            .lean<ManagerResponse>();


        // cek response 
        if (!response) {
            throw new Error('manager not found')
        }


        return toManagerResponse({
            ...response,
            _id: response._id as string,
            avatarUrl: response.avatar
        })
    }
}