import { Document } from "mongodb";


// model db
export interface IStudent extends Document {
    name: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'MANAGER' | 'ADMIN';
    avatar: string;
}
// create request 
export type CreateStudentRequest = {
    name: string;
    email: string;
    password: string;
    avatar: string;
}


// update request 
export type UpdateStudentRequest = {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
}


// delete request 
export type DeleteStudentRequest = {
    id: string;
}


// response 
export type StudentResponse = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    avatarUrl: string;
}


// to response 
export const toStudentResponse = (student: IStudent & { avatarUrl: string }): StudentResponse => {
    return {
        id: student._id.toString(),
        name: student.name,
        email: student.email,
        password: student.password,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl,
    }
}