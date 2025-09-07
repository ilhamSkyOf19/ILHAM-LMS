import z, { ZodType } from "zod";
import { CreateManagerRequest, UpdateManagerRequest } from "../models/manager-model";

export class ManagerValidation {

    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
        avatar: z.string()
    }).strict() as ZodType<CreateManagerRequest>

    // update 
    static readonly UPDATE = z.object({
        name: z.string().optional(),
        email: z.email().optional(),
        password: z.string().optional(),
        avatar: z.string().optional()
    }).strict() as ZodType<UpdateManagerRequest>
}