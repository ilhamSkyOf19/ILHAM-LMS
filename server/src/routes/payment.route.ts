import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";



const paymentRoute: Router = Router();


// handle after payment
paymentRoute.post('/handleAfterPayment', PaymentController.handleAfterPayment)


// export default 
export default paymentRoute