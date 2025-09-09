import { Document, Types } from "mongoose";
// entity
export type BundleEntity = {
    name: string;
    benefits: string[];
    limit_course: number;
    limit_student: number;
    price: number;
}



// // model db
export interface IBundle extends Document, BundleEntity { };



// create bundlle 
export type CreateBundleRequest = BundleEntity;



// bundle response 
export type BundleResponse = BundleEntity & {
    _id: string
};


// to bundle response 
export const toBundleResponse = (bundle: BundleResponse): BundleResponse => {
    return {
        _id: bundle._id.toString(),
        name: bundle.name,
        benefits: bundle.benefits,
        limit_course: bundle.limit_course,
        limit_student: bundle.limit_student,
        price: bundle.price
    }
}