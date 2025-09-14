import AXIOS from "../lib/axios";
import type { ContentResponse, CreateContentModel, UpdateContentModel } from "../models/content-model";
import type { ResponseData } from "../types/types";

export class ContentService {
    // get all
    static async get(id_course: string): Promise<ResponseData<ContentResponse[]>> {

        // get response axios 
        const response = await AXIOS.get(`/${id_course}/content/all`).then(res => res.data);


        // return response axios 
        return response
    }


    // get all
    static async getDetail(id_content: string): Promise<ResponseData<ContentResponse>> {

        // get response axios 
        const response = await AXIOS.get(`/content/detail/${id_content}`).then(res => res.data);



        // return response axios 
        return response
    }

    // create 
    static async create(id_course: string, req: CreateContentModel): Promise<ResponseData<CreateContentModel>> {

        // get response axios 
        const response = await AXIOS.post(`/${id_course}/content/create`, req, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data);


        // return response axios 
        return response
    }


    // update 
    static async update(id_content: string, req: UpdateContentModel): Promise<ResponseData<UpdateContentModel>> {

        // get response axios 
        const response = await AXIOS.patch(`/content/update/${id_content}`, req, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data);


        // return response axios 
        return response
    }
}