import { Schema, model } from "mongoose";
import { IStudent } from "../models/student-model";



const studentSchema = new Schema<IStudent>(
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
            default: "STUDENT",
            required: true,
            immutable: true
        },
        avatar: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// create model
const Student = model<IStudent>("Student", studentSchema);

export default Student;
