import z, { ZodType } from "zod";
import { CreateTransactionBundleRequest } from "../models/transaction-bundle-model";

export class TransactionBundleValidation {
    // create 
    static readonly CREATE = z.object({
        id_bundle: z.string(),
        price: z.number()
    }).strict() as ZodType<Omit<CreateTransactionBundleRequest, "id_manager">>
}