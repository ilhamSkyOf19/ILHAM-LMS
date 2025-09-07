import { NextFunction, Request, Response } from 'express';
import { CreateStudentRequest, StudentResponse } from '../models/student-model';
import { ResponseData } from '../types/types';
import bcrypt from 'bcrypt';
import { StudentService } from '../services/student.service';

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
}