import express, { Router } from "express";
import ValidationRequest from "../middlewares/validation-request";
import { CourseCreateRequest } from "../models/course-model";
import { CourseValidation } from "../validation/course-validation";
import { CourseController } from "../controllers/course.controller";



const courseRoute: Router = express.Router();

// create 
courseRoute.post('/create/:id', ValidationRequest<CourseCreateRequest>(CourseValidation.CREATE), CourseController.create);


export default courseRoute