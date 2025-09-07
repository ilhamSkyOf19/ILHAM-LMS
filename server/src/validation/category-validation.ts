import z, { ZodType } from "zod";
import { CategoryCreateRequest } from "../models/category-model";

export class CategoryValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string()
    }).strict() as ZodType<CategoryCreateRequest>


    // update 
    static readonly UPDATE = z.object({
        name: z.string().optional()
    }).strict()
}