import { model, Schema } from "mongoose";
import { IBundle } from "../models/bundle-model";



const bundleSchema = new Schema<IBundle>({
    name: {
        type: String,
        required: true
    },
    benefits: {
        type: [String],
        required: true
    },
    limit_course: {
        type: Number,
        required: true
    },
    limit_student: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


// create model 
const Bundle = model<IBundle>("Bundle", bundleSchema);

export default Bundle;