import { Schema, model } from "mongoose";
import { IManager } from "../models/manager-model";
import Course from "./course-schema";

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
        limit_course: {
            type: Number,
            required: true
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
        // delete course 
        await Course.deleteMany({ manager: doc._id });
    } catch (error) {
        console.log(error);
    }
})

// create model
const Manager = model<IManager>("Manager", managerSchema);

export default Manager;