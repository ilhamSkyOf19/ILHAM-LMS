import { Model } from "mongoose";
import { CreatePaymentRequest, PaymentResponse } from "../models/payment-model";
import { ITransactionBundle } from "../models/transaction-bundle-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { ITraansactionCourse } from "../models/transaction-course-model";



export class PaymentService {


    // payment bundle 
    static async payment(req: CreatePaymentRequest, type: "extend" | "new"): Promise<ResponseData<PaymentResponse>> {


        // midtrans url
        const midtransUrl: string = process.env.MIDTRANS_URL || "";

        // midtrans auth string 
        const midtransAuthString: string = process.env.MIDTRANS_AUTH_STRING || "";

        // succes url 
        const succesUrl: string = process.env.SUCCESS_URL || "";


        // response midtrans 
        const response = await fetch(midtransUrl, {
            //  method 
            method: 'POST',
            // body
            body: JSON.stringify({
                // transaction details
                transaction_details: {
                    order_id: `${type}-${req.name}-${req.id_transaction}-${Math.floor(Math.random() * 1000)}`,
                    gross_amount: req.price,
                },
                credit_card: {
                    "secure": true
                },
                customer_details: {
                    email: req.email_user,
                },
                callbacks: {
                    finish: `${succesUrl}`
                }
            }),

            // headers
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${midtransAuthString}`
            }
        });


        // handle error 
        if (!response.ok) {
            const errorResponse = await response.text();
            console.log(errorResponse);
            return {
                success: false,
                message: `Midtrans Error: ${errorResponse}`
            }
        }


        // return url
        return {
            success: true,
            data: await response.json() // return json
        }
    }


    // payment update 
    static async updatePayment<T extends ITransactionBundle | ITraansactionCourse>(req: { id: string, status: "success" | "failure" }, model: Model<T>): Promise<ResponseMessage> {

        // cek transaction
        const response = await model.findByIdAndUpdate({
            _id: req.id
        }, {
            $set: {
                status: req.status
            }
        }, { new: true })

        if (!response) return {
            success: false,
            message: "Transaction not found"
        }

        // return
        return {
            success: true,
            message: "Transaction updated"
        }


    }
}