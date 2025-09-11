import { BundleService } from '../../services/bundle.service';

const useLoaderBundle = async () => {
    try {

        // response 
        const response = await BundleService.get();

        // cek response 
        if (!response.success) return response;


        // return 
        return response

    } catch (error) {
        // error
        console.log(error);
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}


export default useLoaderBundle;