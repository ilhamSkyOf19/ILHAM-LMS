import z, { ZodType } from "zod";
import { CourseCreateRequest, CourseUpdateRequest } from "../models/course-model";

export class CourseValidation {
    // create
    static readonly CREATE = z.object({
        name: z.string(),
        tagline: z.string(),
        description: z.string(),
        price: z.coerce.number(),
        category: z.string(),
    }).strict() as ZodType<CourseCreateRequest>


    // update 
    static readonly UPDATE = z.object({
        name: z.string().optional(),
        tagline: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        category: z.string().optional(),
    }).strict() as ZodType<CourseUpdateRequest>
}