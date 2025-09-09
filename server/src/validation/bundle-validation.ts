import z, { ZodType } from "zod";
import { CreateBundleRequest, UpdateBundleRequest } from "../models/bundle-model";

export class BundleValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        benefits: z.array(z.string()),
        limit_course: z.number(),
        limit_student: z.number(),
        price: z.number()
    }).strict() as ZodType<CreateBundleRequest>


    // update 
    static readonly UPDATE = z.object({
        name: z.string().optional(),
        benefits: z.array(z.string()).optional(),
        limit_course: z.number().optional(),
        limit_student: z.number().optional(),
        price: z.number().optional()
    }).strict() as ZodType<UpdateBundleRequest>
}