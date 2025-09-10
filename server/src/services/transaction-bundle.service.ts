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
        const bundle = await Bundle.findById(req.id_bundle);

        // cek bundle 
        if (!bundle) return {
            success: false,
            message: "bundle not found"
        };

        // cek manager 
        const manager = await Manager.findById(req.id_manager);

        // cek manager 
        if (!manager) return {
            success: false,
            message: "manager not found"
        };


        // cek transaction 
        const findTransaction = await TransactionBundle.findOne({
            id_manager: req.id_manager,
            id_bundle: req.id_bundle,
            status: "success"
        });

        // cek transaction 
        if (findTransaction) {
            if (findTransaction.id_bundle.toString() === req.id_bundle) {

                // cek expire at 
                if (findTransaction.expiresAt > new Date()) {

                    console.log("masuk");
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

                } else {

                    // findTransaction.expiresAt = new Date()
                    // findTransaction.expiresAt.setDate(new Date().getDate() + 30);

                    // await findTransaction.save();

                    // return {
                    //     success: false,
                    //     message: "transaction longer than 30 days"
                    // }

                }
            } else {
                // update transaction
                // findTransaction.status = "failed";
                // await findTransaction.save();

            }
        }



        // expires at

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // set to 30 days from now


        // create db 
        const transaction = await TransactionBundle.create({
            id_manager: req.id_manager,
            id_bundle: req.id_bundle,
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