import z, { ZodType } from "zod";
import { CreateContentRequest } from "../models/content-model";

export class ContentValidation {
    // create 
    static readonly CREATE = z.object({
        title: z.string(),
        type: z.enum(["video", "text"]),
        videoId: z.string().optional(),
        text: z.string().optional()
    }).strict() as ZodType<CreateContentRequest>
}