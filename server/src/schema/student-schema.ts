import { Schema, model, Document } from "mongoose";
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
            required: true
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
