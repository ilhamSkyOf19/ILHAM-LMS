import { TokenRequest } from "../models/jwt-model";
import { TransactionRequest } from "../models/payment-model";
import { CreateTransactionBundleRequest, ITransactionBundle } from "../models/transaction-bundle-model";
import TransactionBundle from "../schema/transaction-bundle-schema";
import { PaymentService } from "../services/payment.service";
import { TransactionBundleService } from "../services/transaction-bundle.service";
import { ResponseData, ResponseMessage } from "../types/types";
import { NextFunction, Request, Response } from "express";
export class PaymentController {

    // create 
    static transaction(transaction: 'bundle' | 'course') {
        return async (req: TokenRequest<{}, {}, TransactionRequest>, res: Response<ResponseData<string>>, next: NextFunction) => {

            try {
                // get data token 
                const { id } = req.data ?? { id: '' };


                // get body 
                const body = req.body;


                if (transaction === 'bundle') {
                    // get service 
                    const response = await TransactionBundleService.create({
                        id_bundle: body.id_item,
                        id_manager: id
                    });


                    // cek response 
                    if (!response.success) {
                        return res.status(400).json(response)
                    }

                    // response 
                    return res.status(200).json(response)
                } else {
                    // get service 
                    const response = await TransactionBundleService.create({
                        id_bundle: body.id_item,
                        id_manager: id
                    });


                    // cek response 
                    if (!response.success) {
                        return res.status(400).json(response)
                    }

                    // response 
                    return res.status(200).json(response)
                }


            } catch (error) {
                // error handler 
                console.log(error);
                next(error)
            }

        }
    }


    // handle payment 
    static async handleAfterPayment(req: Request, res: Response<ResponseMessage>) {
        try {
            // get name & id order
            const [type, name, order_id] = req.body.order_id.split("-") as ["new" | "extend", string, string];


            // get body
            const body = req.body;

            switch (body.transaction_status) {
                case "capture":
                case "settlement":
                    if (name === "bundle") {
                        if (type === 'extend') {
                            // cek response
                            const findTransaction = await TransactionBundle.findOne({ _id: order_id, status: "success" });


                            // cek transaction
                            if (!findTransaction) {
                                return res.status(400).json({
                                    success: false,
                                    message: "Transaction not found"
                                });
                            }

                            // date conditional
                            const baseDate = findTransaction.expiresAt > new Date()
                                ? findTransaction.expiresAt
                                : new Date()



                            // update expire + 30 days
                            await TransactionBundle.findByIdAndUpdate(
                                { _id: order_id },
                                { $set: { expiresAt: new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000) } },
                                { new: true, runValidators: true }
                            );

                            return {
                                success: true,
                                message: "Success"
                            }


                        } else {


                            // cek response
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
                    }

                    break;
                case "deny":
                case "cancel":
                case "expire":
                case "failure":
                    console.log("Transaction pending, skip extend:", order_id);
                    break;
                default:
                    console.log("Transaction pending, skip extend:", order_id);
                    break;
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