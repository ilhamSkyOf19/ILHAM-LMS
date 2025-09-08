import { StudentResponse, toStudentResponse, UpdateStudentRequest } from "../models/student-model";
import Student from "../schema/student-schema";
import { ResponseData, ResponseMessage } from "../types/types";
import bcrypt from 'bcrypt';

export class StudentService {
    // update 
    static async update(id: string, req: UpdateStudentRequest): Promise<ResponseData<StudentResponse>> {

        // cek password 
        if (req.password) {
            // hash password 
            const hashPassword = await bcrypt.hash(req.password, 10);
            req.password = hashPassword
        }

        // update data
        const response = await Student.findByIdAndUpdate(
            id,
            req,
            {
                new: true
            }
        ).lean<StudentResponse>();

        // check 
        if (!response) {
            return {
                success: false,
                message: 'student not found'
            }
        };

        // response
        return {
            success: true,
            data: toStudentResponse({
                ...response,
                _id: response._id as string,
                avatarUrl: response.avatar
            })
        }
    }

    // delete student 
    static async delete(id: string): Promise<ResponseMessage> {
        // delete data 
        const response = await Student.findByIdAndDelete(id);

        if (!response) {
            return {
                success: false,
                message: 'student not found'
            }
        }

        // response
        return {
            success: true,
            message: 'student deleted'
        }
    }
}