export type SigninRequest = {
    email: string;
    password: string;
}


// auth response 
export type AuthResponse = {
    id: string;
    name: string;
    email: string;
    role: string;
}