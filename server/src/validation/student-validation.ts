import z, { ZodType } from "zod";
import { CreateStudentRequest, UpdateStudentRequest } from "../models/student-model";
export class StudentValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string()
    }).strict() as ZodType<CreateStudentRequest>


    // update
    static readonly UPDATE = z.object({
        name: z.string().optional(),
        email: z.email().optional(),
        password: z.string().optional(),
        avatar: z.string().optional()
    }).strict() as ZodType<UpdateStudentRequest>
}