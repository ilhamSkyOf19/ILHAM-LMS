import { model, Schema } from "mongoose";
import { IBundle } from "../models/bundle-model";
import Manager from "./manager-schema";



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


// delete 
bundleSchema.post('findOneAndDelete', async function (doc) {
    try {
        // delete relasi to course
        await Manager.updateMany({
            bundle: doc._id
        }, {
            $set: {
                bundle: null
            }
        })
    } catch (error) {
        console.log(error);
    }
})

// create model 
const Bundle = model<IBundle>("Bundle", bundleSchema);

export default Bundle;