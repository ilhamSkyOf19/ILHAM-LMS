import { CreateStudentRequest, StudentResponse, toStudentResponse } from "../models/student-model";
import Student from "../schema/student-schema";

export class StudentService {
    // create 
    static async create(req: CreateStudentRequest): Promise<StudentResponse> {
        // create data 
        const response = new Student({
            ...req,
            role: 'STUDENT'
        });

        // save data 
        await response.save();

        // return data

        return toStudentResponse({
            ...response._doc,
            avatarUrl: response.avatar
        })



    }
}