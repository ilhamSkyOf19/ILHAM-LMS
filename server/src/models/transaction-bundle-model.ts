import { Document, Types } from "mongoose"

// entity
export type TransactionBundleEntity = {
    manager: Types.ObjectId
    bundle: Types.ObjectId
    status: 'pending' | 'success' | 'failed'
    expiresAt: Date
}


// model db 
export interface ITransactionBundle extends Document, TransactionBundleEntity { }



// create bundle 
export type CreateTransactionBundleRequest = {
    manager: string
    bundle: string
}


