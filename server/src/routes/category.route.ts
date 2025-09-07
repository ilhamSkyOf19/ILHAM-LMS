import { Router } from "express";
import ValidationRequest from "../middlewares/validation-request";
import { CategoryValidation } from "../validation/category-validation";
import { CategoryCreateRequest } from "../models/category-model";
import { CategoryController } from "../controllers/category.controller";



// initialize route
const categoryRoute: Router = Router();

// create 
categoryRoute.post('/create', ValidationRequest<CategoryCreateRequest>(CategoryValidation.CREATE), CategoryController.create);

export default categoryRoute