import { Schema, model } from "mongoose";
import { IManager } from "../models/manager-model";

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

// create model
const Manager = model<IManager>("Manager", managerSchema);

export default Manager;