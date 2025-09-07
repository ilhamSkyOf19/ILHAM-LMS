import z, { ZodType } from "zod";
import { CreateStudentRequest } from "../models/student-model";
export class StudentValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
        avatar: z.string()
    }).strict() as ZodType<CreateStudentRequest>
}