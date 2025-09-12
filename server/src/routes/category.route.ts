import { Router } from "express";
import ValidationRequest from "../middlewares/validation-request";
import { CategoryValidation } from "../validation/category-validation";
import { CategoryCreateRequest } from "../models/category-model";
import { CategoryController } from "../controllers/category.controller";
import tokenMiddleware from "../middlewares/token-middleware";



// initialize route
const categoryRoute: Router = Router();

// create 
categoryRoute.post('/create', tokenMiddleware("ADMIN"), ValidationRequest<CategoryCreateRequest>(CategoryValidation.CREATE), CategoryController.create);


// get all 
categoryRoute.get('/all', CategoryController.getAll);

export default categoryRoute