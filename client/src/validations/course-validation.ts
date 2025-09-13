import z from "zod";
import type { CreateCourseModel, UpdateCourseModel } from "../models/course-model";


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


    // update 
    static readonly UPDATE = z.object({
        name: z.string().optional(),
        tagline: z.string().optional(),
        description: z.string().optional(),
        price: z
            .string()
            .refine((val) => !isNaN(Number(val)), { message: "Price must be a valid number" }).optional(),
        category: z.string().optional(),
        thumbnail: z.any().refine((file) => file?.name, { message: 'thumbnail is required' }).optional(),
    }).strict() satisfies z.ZodType<UpdateCourseModel>



}