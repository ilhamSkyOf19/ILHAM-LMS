import { Document, Types } from "mongoose";



// entity
export type StudentEntity = {
    name: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'MANAGER' | 'ADMIN';
    avatar: string;
}
// model db
export interface IStudent extends Document, StudentEntity { }


// create request 
export type CreateStudentRequest = Omit<StudentEntity, "role" | "limit_course">;

// update request
export type UpdateStudentRequest = Partial<
    Omit<StudentEntity, "role">
>;


// delete request 
export type DeleteStudentRequest = {
    id: string;
}


// response 
export type StudentResponse = Omit<StudentEntity, "password"> & {
    _id: string;
    avatarUrl: string;
};


// to response 
export const toStudentResponse = (
    student: StudentResponse
): StudentResponse => {
    return {
        _id: student._id.toString(),
        name: student.name,
        email: student.email,
        role: student.role,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl,
    };
};