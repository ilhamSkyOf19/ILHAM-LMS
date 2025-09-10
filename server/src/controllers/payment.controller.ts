import { ITransactionBundle } from "../models/transaction-bundle-model";
import TransactionBundle from "../schema/transaction-bundle-schema";
import { PaymentService } from "../services/payment.service";
import { ResponseMessage } from "../types/types";
import { Request, Response } from "express";
export class PaymentController {
    // handle after payment 
    // handle payment 
    static async handleAfterPayment(req: Request, res: Response<ResponseMessage>) {
        try {
            // get name & id order
            const [name, order_id] = req.body.order_id.split("-");


            // get body
            const body = req.body;

            switch (body.transaction_status) {
                case "capture":
                case "settlement":
                    if (name === "bundle") {
                        const response = await PaymentService.updatePayment<ITransactionBundle>({ id: order_id, status: "success" }, TransactionBundle);

                        if (!response.success) {
                            console.log(response);
                            return res.status(400).json(response)
                        }

                        return res.status(200).json({
                            success: true,
                            message: "Success"
                        });
                    }

                    break;
                case "deny":
                case "cancel":
                case "expire":
                case "failure":
                    if (name === "bundle") {
                        const response = await PaymentService.updatePayment<ITransactionBundle>({ id: order_id, status: "failure" }, TransactionBundle);

                        if (!response.success) {
                            console.log(response);
                            return res.status(400).json(response)
                        }
                        return res.status(200).json({
                            success: true,
                            message: "Failure"
                        });
                    }
                    break;
                default:
                    return res.status(400).json({
                        success: false,
                        message: "Invalid transaction status"
                    })
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}