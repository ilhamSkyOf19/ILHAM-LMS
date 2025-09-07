import { NextFunction, Request, Response } from 'express';
import { CreateStudentRequest, StudentResponse, UpdateStudentRequest } from '../models/student-model';
import { ResponseData } from '../types/types';
import bcrypt from 'bcrypt';
import { StudentService } from '../services/student.service';
import Student from '../schema/student-schema';

export class StudentController {


    // create 
    static async create(req: Request<{}, {}, CreateStudentRequest>, res: Response<ResponseData<StudentResponse>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;

            // hash password 
            const hashPassword = await bcrypt.hash(body.password, 10);


            // create student 
            const student = await StudentService.create({
                ...body,
                password: hashPassword
            });


            // return 
            return res.status(200).json({
                success: true,
                data: student
            });


        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // update 
    static async update(req: Request<{ id: string }, {}, UpdateStudentRequest>, res: Response<ResponseData<StudentResponse>>, next: NextFunction) {
        try {
            // cek body
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Request"
                })
            }

            // get body
            const body = req.body

            // get params 
            const id = req.params.id


            // cek user 
            const student = await Student.findById(id)

            // cek student 
            if (!student) {
                return res.status(400).json({
                    success: false,
                    message: "student not found"
                })
            }


            // cek password 
            if (body.password) {
                // hash password 
                const hashPassword = await bcrypt.hash(body.password, 10);
                body.password = hashPassword
            }



            // update student 
            const updatedStudent = await StudentService.update(id, body)



            // response 
            return res.status(200).json({
                success: true,
                data: updatedStudent
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}