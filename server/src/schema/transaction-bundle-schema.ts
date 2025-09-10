import { model, Schema } from "mongoose";
import { ITransactionBundle } from "../models/transaction-bundle-model";



const transactionBundleSchema = new Schema<ITransactionBundle>({
    id_manager: {
        type: Schema.Types.ObjectId,
        ref: "Manager",
        required: true,
        index: true
    },
    id_bundle: {
        type: Schema.Types.ObjectId,
        ref: "Bundle",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})


// index compund
transactionBundleSchema.index({ id_manager: 1, status: 1 });

// create model 
export const TransactionBundle = model<ITransactionBundle>("TransactionBundle", transactionBundleSchema)


// export model 
export default TransactionBundle