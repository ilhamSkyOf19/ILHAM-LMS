import { Document, Types } from "mongoose";

// entity
export type ContentEntity = {
    title: string;
    type: "video" | "text";
    videoId: string | null;
    text: string | null;
    course: Types.ObjectId;
}


// model db
export interface IContent extends ContentEntity, Document<Types.ObjectId> { };


// create request 
export type CreateContentRequest = Omit<ContentEntity, "_id" | "course">


// update request 
export type UpdateContentRequest = Partial<CreateContentRequest>


// response 
export type ContentResponse = {
    _id: string;
    title: string;
    type: "video" | "text";
    videoId: string | null;
    text: string | null;
    course: string;
}


// to content response 
export const toContentResponse = (content: ContentResponse): ContentResponse => {
    return {
        _id: content._id.toString(),
        title: content.title,
        type: content.type,
        videoId: content.videoId,
        text: content.text,
        course: content.course
    }
}


export type ContentResponseAll = {
    _id: string;
    title: string;
    type: "video" | "text";
    videoId: string | null;
    text: string | null;
}


// to content response 
export const toContentResponseAll = (content: ContentResponseAll): ContentResponseAll => {
    return {
        _id: content._id.toString(),
        title: content.title,
        type: content.type,
        videoId: content.videoId,
        text: content.text,
    }
}