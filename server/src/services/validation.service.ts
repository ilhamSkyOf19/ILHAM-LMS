import { ZodType } from "zod"
import { ResponseData } from "../types/types"

const validationService = <T>(
    schema: ZodType<T>,
    req: T
): ResponseData<T> => {

    // get request data 
    const result = schema.safeParse(req);

    // cek 
    if (!result.success) {
        const errorMessages = result.error.issues.map((err) => err.message)[0];
        return {
            success: false,
            message: errorMessages,
        };
    }

    return {
        success: true,
        data: result.data
    }
}


export default validationService