import { BundleResponse, CreateBundleRequest, toBundleResponse, UpdateBundleRequest } from "../models/bundle-model";
import Bundle from "../schema/bundle-schema";
import { ResponseData, ResponseMessage } from "../types/types";

export class BundleService {
    // create 
    static async create(req: CreateBundleRequest): Promise<BundleResponse> {

        // create bundle 
        const bundle = await Bundle.create(req);


        // convert to object
        const response = bundle.toObject();

        // return 
        return toBundleResponse({
            ...response,
            _id: response._id as string
        })

    }

    // update 
    static async update(idBundle: string, req: UpdateBundleRequest): Promise<ResponseData<BundleResponse>> {

        // update bundle 
        const response = await Bundle.findByIdAndUpdate({ _id: idBundle }, req, { new: true }).lean<BundleResponse>();


        // cek response 
        if (!response) {
            return {
                success: false,
                message: 'bundle not found'
            }
        }


        // return 
        return {
            success: true,
            data: toBundleResponse(response)
        }
    }

    // get all bundle 
    static async getAll(): Promise<ResponseData<BundleResponse[]>> {

        // get bundle 
        const response = await Bundle.find().lean<BundleResponse[]>();;

        if (!response) {
            return {
                success: false,
                message: 'bundle not found'
            }
        }

        // return 
        return {
            success: true,
            data: response.map(bundle => toBundleResponse(bundle))
        }
    }


    // delete bundle 
    static async delete(id: string): Promise<ResponseMessage> {

        // delete data 
        const response = await Bundle.findByIdAndDelete(id);


        // cek response 
        if (!response) {
            return {
                success: false,
                message: 'bundle not found'
            }
        }


        // response 
        return {
            success: true,
            message: 'bundle deleted'
        }
    }
}