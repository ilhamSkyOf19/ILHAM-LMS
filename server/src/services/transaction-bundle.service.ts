import { CreateTransactionBundleRequest } from "../models/transaction-bundle-model";
import Bundle from "../schema/bundle-schema";
import Manager from "../schema/manager-schema";
import TransactionBundle from "../schema/transaction-bundle-schema";
import { ResponseData } from "../types/types";
import { PaymentService } from "./payment.service";

export class TransactionBundleService {

    // create 
    static async create(req: CreateTransactionBundleRequest): Promise<ResponseData<string>> {

        // cek bundle 
        const bundle = await Bundle.findById(req.bundle);

        // cek bundle 
        if (!bundle) return {
            success: false,
            message: "bundle not found"
        };

        // cek manager 
        const manager = await Manager.findById(req.manager);

        // cek manager 
        if (!manager) return {
            success: false,
            message: "manager not found"
        };


        // cek transaction 
        const findTransaction = await TransactionBundle.findOne({
            manager: req.manager,
            status: "success"
        });

        console.log(req)
        console.log(findTransaction);



        // cek transaction 
        if (findTransaction) {
            if (findTransaction.bundle.toString() === req.bundle) {
                // payment
                const payment = await PaymentService.payment({
                    id_transaction: findTransaction._id as string,
                    email_user: manager.email,
                    price: bundle.price,
                    name: "bundle"
                }, "extend");


                // cek payment
                if (!payment.success) return payment;


                // return
                return {
                    success: true,
                    data: payment.data.redirect_url
                }
            } else if (findTransaction.bundle.toString() !== req.bundle) {
                // delete transaction
                await findTransaction.deleteOne();
            }
        }




        // expires at
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // set to 30 days from now


        // create db 
        const transaction = await TransactionBundle.create({
            manager: req.manager,
            bundle: req.bundle,
            status: "pending",
            expiresAt
        });


        // cek transaction 
        if (!transaction) return {
            success: false,
            message: "transaction not created"
        };


        // convert to object 
        const response = transaction.toObject();

        // payment 
        const payment = await PaymentService.payment({
            id_transaction: response._id as string,
            email_user: manager.email,
            price: bundle.price,
            name: "bundle"
        }, "new")


        // cek payment 
        if (!payment.success) return payment;


        // return 
        return {
            success: true,
            data: payment.data.redirect_url
        }
    }

}