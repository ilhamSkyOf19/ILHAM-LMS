import { Students } from "../generated/prisma";

// create request 
export type CreateStudentRequest = {
    name: string;
    email: string;
    password: string;
    avatarUrl: string;
}


// update request 
export type UpdateStudentRequest = {
    name?: string;
    email?: string;
    password?: string;
    avatarUrl?: string;
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
export const toResponse = (student: Students & { avatarUrl: string }): StudentResponse => {
    return {
        id: student.id,
        name: student.name,
        email: student.email,
        password: student.password,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl,
    }
}