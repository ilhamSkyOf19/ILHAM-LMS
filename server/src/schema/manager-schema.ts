import { Schema, model } from "mongoose";
import { IManager } from "../models/manager-model";
import Course from "./course-schema";
import Category from "./category-schema";

const managerSchema = new Schema<IManager>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["STUDENT", "MANAGER", "ADMIN"],
            default: "MANAGER",
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        bundle: {
            type: Schema.Types.ObjectId,
            default: null
        },
        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course"
            }
        ]
    },
    {
        timestamps: true
    }
)


// delete 
managerSchema.post('findOneAndDelete', async (doc) => {
    try {
        // get course
        const courses = await Course.find({ manager: doc._id });

        // cek course 
        if (courses.length > 0) {
            const courseId = courses.map(c => c._id);

            // delete  course in category
            await Category.updateMany({
                courses: { $in: courseId }
            }, {
                $pull: {
                    courses: { $in: courseId }
                }
            })


            // delete course
            await Course.deleteMany({ manager: doc._id });
        }

    } catch (error) {
        console.log(error);
    }
})

// create model
const Manager = model<IManager>("Manager", managerSchema);

export default Manager;