import { model, Schema } from "mongoose";
import { ICategory } from "../models/category-model";
import Course from "./course-schema";



const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true

    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
})


// delete relasi 
categorySchema.post('findOneAndDelete', async function (doc) {
    try {
        // delete relasi to course
        await Course.updateMany({
            category: doc._id
        }, {
            $set: {
                category: null
            }
        })
    } catch (error) {
        console.log(error);
    }
})


// model 
const Category = model<ICategory>("Category", categorySchema);

// export 
export default Category  
