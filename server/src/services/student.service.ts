import { CreateStudentRequest, StudentResponse, toStudentResponse, UpdateStudentRequest } from "../models/student-model";
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


    // update 
    static async update(id: string, req: UpdateStudentRequest): Promise<StudentResponse> {

        // update data
        const response = await Student.findByIdAndUpdate(
            id,
            req,
            {
                new: true
            }
        );

        // check 
        if (!response) throw new Error('student not found');

        // response
        return toStudentResponse({
            ...response._doc,
            avatarUrl: response.avatar
        })
    }
}