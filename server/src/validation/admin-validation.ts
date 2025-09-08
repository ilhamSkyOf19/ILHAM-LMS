import z, { ZodType } from "zod";
import { CreateAdminRequest } from "../models/admin-mode";

export class AdminValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string()
    }).strict() as ZodType<CreateAdminRequest>
}