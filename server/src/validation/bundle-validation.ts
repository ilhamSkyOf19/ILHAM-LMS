import z, { ZodType } from "zod";
import { CreateBundleRequest } from "../models/bundle-model";

export class BundleValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        benefits: z.array(z.string()),
        limit_course: z.number(),
        limit_student: z.number(),
        price: z.number()
    }).strict() as ZodType<CreateBundleRequest>
}