import { Document, Types } from 'mongoose'
import { BundleResponse } from './bundle-model'

// entity 
export type ManagerEntity = {
    name: string
    email: string
    password: string
    role: 'STUDENT' | 'MANAGER' | 'ADMIN'
    avatar: string
    courses: Types.ObjectId[]
    bundle: Types.ObjectId | null;
}
// model db 
export interface IManager extends ManagerEntity, Document { }


// create request 
export type CreateManagerRequest = Omit<ManagerEntity, '_id' | 'bundle' | 'role' | 'courses'>;


// update type 
export type UpdateManagerRequest = Partial<CreateManagerRequest>;


// response manager 
export type ManagerResponse = Omit<ManagerEntity, 'password' | 'courses' | 'bundle'> & {
    _id: string;
    avatarUrl: string;
    bundle: BundleResponse;
    courses: {
        _id: string
    }[]; // type courses
};


// to response 
export const toManagerResponse = (
    manager: ManagerResponse): ManagerResponse => {
    return {
        _id: manager._id.toString(),
        name: manager.name,
        email: manager.email,
        role: manager.role,
        avatar: manager.avatar,
        bundle: manager.bundle,
        avatarUrl: manager.avatarUrl,
        courses: manager.courses?.map(c => ({
            _id: c._id.toString(),
        })) || []
    }
}