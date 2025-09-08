import express, { Router } from 'express';
import ValidationRequest from '../middlewares/validation-request';
import { CreateStudentRequest, UpdateStudentRequest } from '../models/student-model';
import { StudentValidation } from '../validation/student-validation';
import { StudentController } from '../controllers/student.controller';
import tokenMiddleware from '../middlewares/token-middleware';
import { AuthValidation } from '../validation/auth-validation';
import { SigninRequest } from '../models/auth-model';
import { AuthController } from '../controllers/auth.controller';

const studentRoute: Router = express.Router();

// sign in
studentRoute.post(
    '/signin',
    ValidationRequest<SigninRequest>(AuthValidation.SIGNIN),
    AuthController.studentSignIn
)

// create 
studentRoute.post(
    '/create',
    ValidationRequest<CreateStudentRequest>(StudentValidation.CREATE),
    StudentController.create
)

// update 
studentRoute.patch(
    '/update',
    tokenMiddleware("STUDENT"),
    ValidationRequest<UpdateStudentRequest>(StudentValidation.UPDATE),
    StudentController.update
)


// delete 
studentRoute.delete(
    '/delete/:id',
    tokenMiddleware("ADMIN"),
    StudentController.delete
)


export default studentRoute