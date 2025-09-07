import z, { ZodType } from "zod";
import { CreateManagerRequest } from "../models/manager-model";

export class ManagerValidation {

    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
        avatar: z.string()
    }).strict() as ZodType<CreateManagerRequest>
}