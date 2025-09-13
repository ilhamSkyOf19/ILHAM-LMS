import z from "zod";
import type { CreateContentModel } from "../models/content-model";

export class ContentValidation {
    // create 
    static readonly CREATE = z.object({
        title: z.string().min(1, 'title is required'),
        type: z.enum(['video', 'text'], "please select a type"),
        videoId: z.string().optional(),
        text: z.string().optional(),
    }).strict() satisfies z.ZodType<CreateContentModel>
}