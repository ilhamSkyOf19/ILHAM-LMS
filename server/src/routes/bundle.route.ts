import { Router } from "express";
import { bundleController } from "../controllers/bundle.controller";
import tokenMiddleware from "../middlewares/token-middleware";
import ValidationRequest from "../middlewares/validation-request";
import { CreateBundleRequest } from "../models/bundle-model";
import { BundleValidation } from "../validation/bundle-validation";


// initialize router
const bundleRoute: Router = Router();


// create bundle 
bundleRoute.post('/create', tokenMiddleware("ADMIN"), ValidationRequest<CreateBundleRequest>(BundleValidation.CREATE), bundleController.create);

export default bundleRoute