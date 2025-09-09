import { Router } from "express";
import tokenMiddleware from "../middlewares/token-middleware";
import { ContentValidation } from "../validation/content-validation";
import ValidationRequest from "../middlewares/validation-request";
import { ContentController } from "../controllers/content.controller";
import { CreateContentRequest } from "../models/content-model";


// initialize route
const contentRoute: Router = Router({ mergeParams: true });


// create 
contentRoute.post('/create', tokenMiddleware("MANAGER"), ValidationRequest<CreateContentRequest>(ContentValidation.CREATE), ContentController.create);



// export default 
export default contentRoute