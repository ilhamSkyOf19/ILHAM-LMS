import { CreateManagerRequest, ManagerResponse, toManagerResponse } from "../models/manager-model";
import Manager from "../schema/manager-schema";

import bcrypt from 'bcrypt';
export class ManagerService {
    // create 
    static async create(req: CreateManagerRequest): Promise<ManagerResponse> {

        // hash password
        const passwordHash = await bcrypt.hash(req.password, 10);

        // create data
        const doc = await Manager.create({
            ...req,
            password: passwordHash,
            limit_course: []
        });


        // get response 
        const response = doc.toObject();


        // return data
        return toManagerResponse(
            {
                ...response,
                _id: response._id as string,
                avatarUrl: response.avatar
            })
    }
}