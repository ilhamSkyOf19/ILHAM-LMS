import z from "zod";
import type { CreateContentModel, UpdateContentModel } from "../models/content-model";

export class ContentValidation {
    // create 
    static readonly CREATE = z.object({
        title: z.string().min(1, 'title is required'),
        type: z.enum(['video', 'text'], "please select a type"),
        videoId: z.string().optional(),
        text: z.string().optional(),
    }).strict() satisfies z.ZodType<CreateContentModel>

    // update
    static readonly UPDATE = z.object({
        title: z.string().optional(),
        type: z.enum(['video', 'text'], "please select a type").optional(),
        videoId: z.string().optional(),
        text: z.string().optional(),
    }).strict() satisfies z.ZodType<UpdateContentModel>
}