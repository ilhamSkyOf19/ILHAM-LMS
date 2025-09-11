import { CourseResponse } from "../models/course-model";
import { StudentResponse, toStudentResponse, UpdateStudentRequest } from "../models/student-model";
import { CourseEntity } from "../models/transaction-course-model";
import Student from "../schema/student-schema";
import TransactionCourse from "../schema/transaction-course-schema";
import { ResponseData, ResponseMessage } from "../types/types";
import bcrypt from 'bcrypt';

export class StudentService {


    // get detail student 
    static async getDetail(id: string): Promise<ResponseData<StudentResponse>> {

        // cek student 
        const response = await Student.findById(id).lean<StudentResponse>();

        // cek 
        if (!response) {
            return {
                success: false,
                message: 'student not found'
            }
        };

        // response 
        const transactions = await TransactionCourse.find({
            student: response._id,   // filter student
            status: 'success'        // hanya yang berhasil
        })
            .populate<{ course: CourseEntity }>({
                path: 'course',          // populate course
                select: 'name thumbnail category',
                populate: {
                    path: 'category',    // populate category di course
                    select: 'name'       // ambil hanya name
                }
            })
            .lean<{
                course: CourseResponse & {
                    category: {
                        name: string
                    }
                }
            }[]>();


        // get course 
        const courses = transactions.length > 0
            ? transactions.map(t => t.course)
            : [];


        // return 
        return {
            success: true,
            data: toStudentResponse({
                ...response,
                _id: response._id.toString(),
                courses: courses
            })
        };

    }

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