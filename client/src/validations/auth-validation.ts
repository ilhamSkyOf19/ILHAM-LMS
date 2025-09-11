import z, { ZodType } from 'zod'
import type { SignInRequestType, SignUpRequestType } from '../models/auth-model'

export class AuthValidation {

    // sign up 
    static readonly SIGN_UP = z.object({
        name: z.string().min(3, "Name must be at least 3 characters").max(50).trim().regex(/^[A-Za-z]+$/, "Name must not contain numbers"),
        email: z.email(),
        password: z.string().min(6, "Password must be at least 6 characters").max(50).trim()
    }).strict() satisfies ZodType<SignUpRequestType>


    // sign in 
    static readonly SIGN_IN = z.object({
        email: z.email(),
        password: z.string().min(6, "Password must be at least 6 characters").max(50).trim()
    }).strict() satisfies ZodType<SignInRequestType>
}