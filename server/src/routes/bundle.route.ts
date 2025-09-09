import { Router } from "express";
import { bundleController } from "../controllers/bundle.controller";
import tokenMiddleware from "../middlewares/token-middleware";
import ValidationRequest from "../middlewares/validation-request";
import { CreateBundleRequest, UpdateBundleRequest } from "../models/bundle-model";
import { BundleValidation } from "../validation/bundle-validation";


// initialize router
const bundleRoute: Router = Router();


// get all 
bundleRoute.get('/all', bundleController.getAll);



// create bundle 
bundleRoute.post('/create', tokenMiddleware("ADMIN"), ValidationRequest<CreateBundleRequest>(BundleValidation.CREATE), bundleController.create);



// update 
bundleRoute.patch('/update/:id', tokenMiddleware("ADMIN"), ValidationRequest<UpdateBundleRequest>(BundleValidation.UPDATE), bundleController.update);


// delete 
bundleRoute.delete('/delete/:id', tokenMiddleware("ADMIN"), bundleController.delete);


export default bundleRoute