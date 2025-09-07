import express, { Router } from 'express';
import ValidationRequest from '../middlewares/validation-request';
import { CreateStudentRequest, UpdateStudentRequest } from '../models/student-model';
import { StudentValidation } from '../validation/student-validation';
import { StudentController } from '../controllers/student.controller';

const studentRoute: Router = express.Router();

// create 
studentRoute.post(
    '/create',
    ValidationRequest<CreateStudentRequest>(StudentValidation.CREATE),
    StudentController.create
)

// update 
studentRoute.patch(
    '/update/:id',
    ValidationRequest<UpdateStudentRequest>(StudentValidation.UPDATE),
    StudentController.update
)


export default studentRoute