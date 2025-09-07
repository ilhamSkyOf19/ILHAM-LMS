import { CreateManagerRequest, ManagerResponse, toManagerResponse, UpdateManagerRequest } from "../models/manager-model";
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
                avatarUrl: response.avatar
            })
    }

    // update manager
    static async update(id: string, req: UpdateManagerRequest): Promise<ManagerResponse> {

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
        if (!response) throw new Error('manager not found');


        return toManagerResponse({
            ...response,
            _id: response._id as string,
            avatarUrl: response.avatar
        })


    }
}