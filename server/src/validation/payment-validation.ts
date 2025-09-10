import z, { ZodType } from "zod";
import { TransactionRequest } from "../models/payment-model";

export class PaymentValidation {
    // create 
    static readonly CREATE = z.object({
        id_item: z.string()
    }).strict() as ZodType<TransactionRequest>
}