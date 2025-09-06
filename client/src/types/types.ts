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