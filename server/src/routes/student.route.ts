import express, { Router } from 'express';
import ValidationRequest from '../middlewares/validation-request';
import { CreateStudentRequest } from '../models/student-model';
import { StudentValidation } from '../validation/student-validation';
import { StudentController } from '../controllers/student.controller';

const studentRoute: Router = express.Router();

studentRoute.post(
    '/create',
    ValidationRequest<CreateStudentRequest>(StudentValidation.CREATE),
    StudentController.create
)

export default studentRoute