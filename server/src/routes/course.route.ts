import express, { Router } from "express";
import ValidationRequest from "../middlewares/validation-request";
import { CourseCreateRequest } from "../models/course-model";
import { CourseValidation } from "../validation/course-validation";
import { CourseController } from "../controllers/course.controller";



const courseRoute: Router = express.Router();


// get all
courseRoute.get('/all', CourseController.getAll);


// create 
courseRoute.post('/create/:id', ValidationRequest<CourseCreateRequest>(CourseValidation.CREATE), CourseController.create);


// delete 
courseRoute.delete('/delete/:id', CourseController.delete);





export default courseRoute