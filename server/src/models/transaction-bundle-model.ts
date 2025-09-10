import { Document, Types } from "mongoose"

// entity
export type TransactionBundleEntity = {
    id_manager: Types.ObjectId
    id_bundle: Types.ObjectId
    status: 'pending' | 'success' | 'failed'
}


// model db 
export interface ITransactionBundle extends Document, TransactionBundleEntity { }



// create bundle 
export type CreateTransactionBundleRequest = {
    id_manager: string
    id_bundle: string
}


