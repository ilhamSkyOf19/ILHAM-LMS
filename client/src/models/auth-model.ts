// sign request 
export type SignUpRequestType = {
    name: string;
    email: string;
    password: string;
}


// sign in request 
export type SignInRequestType = Omit<SignUpRequestType, 'name'>


// auth response 
export type AuthResponseType = {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'MANAGER';
}

