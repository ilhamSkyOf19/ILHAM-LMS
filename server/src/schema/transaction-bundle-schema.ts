import { model, Schema } from "mongoose";
import { ITransactionBundle } from "../models/transaction-bundle-model";



const transactionBundleSchema = new Schema<ITransactionBundle>({
    manager: {
        type: Schema.Types.ObjectId,
        ref: "Manager",
        required: true,
        index: true
    },
    bundle: {
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
transactionBundleSchema.index({ manager: 1, bundle: 1, status: 1 });

// create model 
export const TransactionBundle = model<ITransactionBundle>("TransactionBundle", transactionBundleSchema)


// export model 
export default TransactionBundle