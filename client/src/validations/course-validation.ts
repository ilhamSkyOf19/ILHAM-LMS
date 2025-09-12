import z from "zod";
import type { CreateCourseModel } from "../models/course-model";


export class CourseValidation {

    // create 
    static readonly CREATE = z.object({
        name: z.string().min(1, 'name is required'),
        tagline: z.string().min(1, 'tagline is required'),
        description: z.string().min(1, 'description is required'),
        price: z
            .string()
            .refine((val) => !isNaN(Number(val)), { message: "Price must be a valid number" }),
        category: z.string().min(1, 'category is required'),
        thumbnail: z.any().refine((file) => file?.name, { message: 'thumbnail is required' }),
    }).strict() satisfies z.ZodType<CreateCourseModel>
}