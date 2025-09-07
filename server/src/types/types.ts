

// response data
export type ResponseData<T> =
    { success: true, data: T }
    | { success: false, message: string }



// response message 
export type ResponseMessage = {
    success: boolean,
    message: string
} 