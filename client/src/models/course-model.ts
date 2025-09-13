

// create course 
export type CreateCourseModel = {
    name: string;
    thumbnail: File
    tagline: string;
    description: string;
    price: string;
    category: string
}

// update course 
export type UpdateCourseModel = {
    name?: string;
    thumbnail?: File
    tagline?: string;
    description?: string;
    price?: string;
    category?: string
}



// student course model 
export type StudenCourseModel = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'MANAGER' | 'ADMIN';
    avatar: string;
    avatarUrl: string;
    courses: {
        _id: string;
        name: string;
        thumbnail: string;
        category: {
            name: string;
        };
    }[] | null

}



// manager course model 
export type CourseModel = {
    _id: string;
    name: string;
    thumbnail: string;
    url_thumbnail: string;
    tagline: string;
    description: string;
    price: number;
    total_student: number;
    manager: {
        _id: string;
    };
    category: {
        _id: string;
        name: string
    };
    contents: {
        _id: string;
    }[]
}