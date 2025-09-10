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
    price: number;
}


// bundle response 
export type TransactionBundleResponse = {
    _id: string
    id_manager: string
    id_bundle: string
    status: 'pending' | 'success' | 'failed'
}



// to bundle response 
export const toTransactionBundleResponse = (bundle: TransactionBundleResponse): TransactionBundleResponse => {
    return {
        _id: bundle._id.toString(),
        id_manager: bundle.id_manager.toString(),
        id_bundle: bundle.id_bundle.toString(),
        status: bundle.status
    }
}

