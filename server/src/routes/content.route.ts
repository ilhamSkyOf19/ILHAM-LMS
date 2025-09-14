import { Router } from "express";
import tokenMiddleware from "../middlewares/token-middleware";
import { ContentValidation } from "../validation/content-validation";
import ValidationRequest from "../middlewares/validation-request";
import { ContentController } from "../controllers/content.controller";
import { CreateContentRequest, UpdateContentRequest } from "../models/content-model";


// initialize route
const contentRoute: Router = Router();

// get all 
contentRoute.get('/:idCourse/content/all', tokenMiddleware("MANAGER"), ContentController.getAll);


// get detail
contentRoute.get('/content/detail/:idContent', tokenMiddleware("MANAGER"), ContentController.getDetail);


// create 
contentRoute.post('/:idCourse/content/create', tokenMiddleware("MANAGER"), ValidationRequest<CreateContentRequest>(ContentValidation.CREATE), ContentController.create);


// update 
contentRoute.patch('/content/update/:idContent', tokenMiddleware("MANAGER"), ValidationRequest<UpdateContentRequest>(ContentValidation.UPDATE), ContentController.edit);


// export default 
export default contentRoute