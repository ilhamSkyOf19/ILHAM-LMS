import type { CourseModel } from "../../models/course-model";
import { CourseService } from "../../services/course.service";
import type { ResponseData } from "../../types/types";



const loaderCourseDetail = async (id: string): Promise<ResponseData<CourseModel>> => {
    try {

        // get service 
        const response = await CourseService.getDetail(id);

        // cek 
        if (!response.success) return response;

        // return 
        return response;

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}


// export
export default loaderCourseDetail