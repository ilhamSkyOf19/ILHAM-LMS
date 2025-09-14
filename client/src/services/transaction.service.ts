import AXIOS from "../lib/axios";
import type { ResponseData } from "../types/types";

export class TransactionService {
    // payment 
    static async pay(data: { id_item: string }): Promise<ResponseData<string>> {
        // response 
        const response = await AXIOS.post(`/payment/bundle`, data,
            { headers: { 'Content-Type': 'application/json' } }).then(res => res.data);


        // return response 
        return response

    }
}