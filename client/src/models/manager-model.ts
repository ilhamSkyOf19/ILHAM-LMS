
// response manager 
export type ManagerResponse = {
    _id: string;
    avatarUrl: string;
    name: string
    email: string
    role: 'STUDENT' | 'MANAGER' | 'ADMIN'
    avatar: string
    bundle: {
        name: string
        limit_course: number
        limit_student: number
        benefits: string[]
    } | null;
    courses: {
        _id: string
    }[];
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