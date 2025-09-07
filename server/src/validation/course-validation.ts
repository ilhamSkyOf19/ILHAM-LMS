import z, { ZodType } from "zod";
import { CourseCreateRequest } from "../models/course-model";

export class CourseValidation {
    // create
    static readonly CREATE = z.object({
        name: z.string(),
        thumbnail: z.string(),
        tagline: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
    }).strict() as ZodType<CourseCreateRequest>
}