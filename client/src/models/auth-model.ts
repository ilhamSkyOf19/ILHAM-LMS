// sign request 
export type SignUpRequestType = {
    name: string;
    email: string;
    password: string;
}


// auth response 
export type AuthResponseType = {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'MANAGER';
}