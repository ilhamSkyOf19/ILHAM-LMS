import { Document, Types } from 'mongoose'

// entity 
export type ManagerEntity = {
    name: string
    email: string
    password: string
    role: 'STUDENT' | 'MANAGER' | 'ADMIN'
    avatar: string
    limit_course: number
    courses: Types.ObjectId[]
}
// model db 
export interface IManager extends ManagerEntity, Document { }


// create request 
export type CreateManagerRequest = Omit<ManagerEntity, '_id' | 'limit_course' | 'role' | 'courses'>;


// update type 
export type UpdateManagerRequest = Partial<CreateManagerRequest>;


// response manager 
export type ManagerResponse = Omit<ManagerEntity, 'password'> & {
    _id: string
    avatarUrl: string,
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
        limit_course: manager.limit_course,
        avatarUrl: manager.avatarUrl,
        courses: manager.courses
    }
}