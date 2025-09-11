import { Router } from "express";
import tokenMiddleware from "../middlewares/token-middleware";
import ValidationRequest from "../middlewares/validation-request";
import { TransactionRequest } from "../models/payment-model";
import { PaymentValidation } from "../validation/payment-validation";
import { PaymentController } from "../controllers/payment.controller";



// initialize 
const transactionRoute: Router = Router();


// payment bundle
transactionRoute.post('/bundle', tokenMiddleware("MANAGER"), ValidationRequest<TransactionRequest>(PaymentValidation.CREATE), PaymentController.transaction('bundle'));


// payment course
transactionRoute.post('/course', tokenMiddleware("STUDENT"), ValidationRequest<TransactionRequest>(PaymentValidation.CREATE), PaymentController.transaction('course'));


// handle after payment
transactionRoute.post('/handleAfterPayment', PaymentController.handleAfterPayment)


// export default 
export default transactionRoute