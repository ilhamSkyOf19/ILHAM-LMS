import { Router } from "express";
import tokenMiddleware from "../middlewares/token-middleware";
import ValidationRequest from "../middlewares/validation-request";
import { TransactionBundleValidation } from "../validation/transaction-bundle-validation";
import { CreateTransactionBundleRequest } from "../models/transaction-bundle-model";
import { TransactionBundleController } from "../controllers/transaction-bundle.controller";



// initialize 
export const transactionBundleRoute: Router = Router();


// create 
transactionBundleRoute.post('/payment', tokenMiddleware("MANAGER"), ValidationRequest<Omit<CreateTransactionBundleRequest, "id_manager">>(TransactionBundleValidation.CREATE), TransactionBundleController.create);


// export default 
export default transactionBundleRoute