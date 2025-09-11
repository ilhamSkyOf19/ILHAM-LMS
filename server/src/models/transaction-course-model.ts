import { Document, Types } from "mongoose"

// entity 
export type CourseEntity = {
    student: Types.ObjectId
    course: Types.ObjectId
    status: 'pending' | 'success' | 'failed'
}

// model db
export interface ITraansactionCourse extends Document, CourseEntity { };



// create transaction
export type CreateTransactionCourseRequest = {
    student: string
    course: string
}