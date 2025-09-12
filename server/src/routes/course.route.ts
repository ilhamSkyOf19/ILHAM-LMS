import express, { Router } from "express";
import ValidationRequest from "../middlewares/validation-request";
import { CourseUpdateRequest } from "../models/course-model";
import { CourseValidation } from "../validation/course-validation";
import { CourseController } from "../controllers/course.controller";
import tokenMiddleware from "../middlewares/token-middleware";
import { MulterService } from "../services/multer.service";



const courseRoute: Router = express.Router();


// get course manager 
courseRoute.get('/manager', tokenMiddleware("MANAGER"), CourseController.getCourseManager);


// get detail course 
courseRoute.get('/detail/:id', CourseController.getCourseDetail);

// get all
courseRoute.get('/all', CourseController.getAll);


// create 
courseRoute.post('/create', tokenMiddleware("MANAGER"), MulterService.uploadFile('thumbnail'), CourseController.create);


// delete 
courseRoute.delete('/delete/:id', tokenMiddleware("MANAGER"), CourseController.delete);

// update 
courseRoute.patch('/update/:id', tokenMiddleware("MANAGER"), MulterService.uploadFile('thumbnail'), CourseController.update);





export default courseRoute