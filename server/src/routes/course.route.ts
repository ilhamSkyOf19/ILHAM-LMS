import express, { Router } from "express";
import ValidationRequest from "../middlewares/validation-request";
import { CourseCreateRequest, CourseUpdateRequest } from "../models/course-model";
import { CourseValidation } from "../validation/course-validation";
import { CourseController } from "../controllers/course.controller";
import tokenMiddleware from "../middlewares/token-middleware";



const courseRoute: Router = express.Router();


// get course manager 
courseRoute.get('/manager', tokenMiddleware("MANAGER"), CourseController.getCourseManager);


// get detail course 
courseRoute.get('/detail/:id', tokenMiddleware('ALL'), CourseController.getCourseDetail);

// get all
courseRoute.get('/all', CourseController.getAll);


// create 
courseRoute.post('/create', tokenMiddleware("MANAGER"), ValidationRequest<CourseCreateRequest>(CourseValidation.CREATE), CourseController.create);


// delete 
courseRoute.delete('/delete/:id', tokenMiddleware("MANAGER"), CourseController.delete);

// update 
courseRoute.patch('/update/:id', tokenMiddleware("MANAGER"), ValidationRequest<CourseUpdateRequest>(CourseValidation.UPDATE), CourseController.update);





export default courseRoute