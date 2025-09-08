import { Document } from "mongoose";

// entity
export type AdminEntity = {
    name: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'MANAGER' | 'ADMIN';
}


// model db 
export interface IAdmin extends Document, AdminEntity { }


// create 
export type CreateAdminRequest = Omit<AdminEntity, '_id' | 'role'>


// response 
export type AdminResponse = Omit<AdminEntity, 'password'> & {
    _id: string
}


// to response 
export function adminToResponse(admin: AdminResponse): AdminResponse {
    return {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
    }
}