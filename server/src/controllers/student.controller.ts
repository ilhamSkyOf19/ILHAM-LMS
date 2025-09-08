import { NextFunction, Request, Response } from 'express';
import { CreateStudentRequest, StudentResponse, UpdateStudentRequest } from '../models/student-model';
import { ResponseData, ResponseMessage } from '../types/types';
import { StudentService } from '../services/student.service';
import Student from '../schema/student-schema';
import { AuthService } from '../services/auth.service';
import { TokenRequest } from '../models/jwt-model';




export class StudentController {


    // create 
    static async create(req: Request<{}, {}, CreateStudentRequest>, res: Response<ResponseData<string>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;

            // create student 
            const student = await AuthService.signup<"student">(body, Student);


            // cek 
            if (!student.success) {
                return res.status(400).json(student)
            }


            // set cookie 
            res.cookie('token', student.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 1000
            })



            // return 
            return res.status(201).json({
                success: true,
                data: "student created & logged in"
            });

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // update 
    static async update(req: TokenRequest<{}, {}, UpdateStudentRequest>, res: Response<ResponseData<StudentResponse>>, next: NextFunction) {
        try {

            // get payload 
            const user = req.data?.id as string;


            // cek body
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Request"
                })
            }

            // get body
            const body = req.body



            // cek user 
            const student = await Student.findById(user)

            // cek student 
            if (!student) {
                return res.status(400).json({
                    success: false,
                    message: "student not found"
                })
            }


            // update student 
            const updatedStudent = await StudentService.update(user, body)

            // cek 
            if (!updatedStudent.success) {
                return res.status(400).json(updatedStudent)
            }

            // response 
            return res.status(200).json(updatedStudent)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    // delete 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseMessage>, next: NextFunction) {
        try {
            // get params id 
            const id = req.params.id;


            // delete student
            const response = await StudentService.delete(id);

            // cek 
            if (!response.success) {
                return res.status(400).json(response)
            }

            return res.status(200).json({
                success: true,
                message: "student deleted"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}