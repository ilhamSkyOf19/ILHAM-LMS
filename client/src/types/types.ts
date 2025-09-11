export type LinkType = {
    link: string,
    label: string
}


// model student 
export type Student = {
    avatar: File | null;
    name: string;
    email: string;
    password: string;
    role: string;
}


// response data 
export type ResponseData<T> =
    { success: true, data: T }
    | { success: false, message: string }


// response message 
export type ResponseService =
    {
        success: boolean,
        message: string
    }