import { BundleResponse, CreateBundleRequest, toBundleResponse } from "../models/bundle-model";
import Bundle from "../schema/bundle-schema";

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
}