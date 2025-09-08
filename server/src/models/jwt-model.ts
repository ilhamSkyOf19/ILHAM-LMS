import { Request } from "express";

// type payload 
export type JWTPayloadType = {
    id: string,
    email: string,
    role: 'ADMIN' | 'STUDENT' | 'MANAGER'
}


// request + token type 
export interface TokenRequest<
    params =
    {},
    _ = {},
    body = {},
    query = {}> extends Request<params, _, body, query> {
    data?: JWTPayloadType
}