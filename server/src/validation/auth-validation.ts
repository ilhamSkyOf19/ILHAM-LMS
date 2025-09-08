import z, { ZodType } from "zod";
import { SigninRequest } from "../models/auth-model";

export class AuthValidation {
    // login
    static readonly SIGNIN = z.object({
        email: z.email(),
        password: z.string()
    }).strict() as ZodType<SigninRequest>
}