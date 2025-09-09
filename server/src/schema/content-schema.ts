import { model, Schema } from "mongoose";
import { IContent } from "../models/content-model";
import Course from "./course-schema";



// schema 
const contentSchema = new Schema<IContent>({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["video", "text"],
        required: true
    },
    videoId: {
        type: String
    },
    text: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
}, {
    timestamps: true
})


// save 
contentSchema.post('save', async function (doc) {
    try {
        // update course
        await Course.findByIdAndUpdate({
            _id: doc.course
        }, {
            $push: {
                contents: doc._id
            }
        })

    } catch (error) {
        console.log(error);
    }
})

// model 
const Content = model<IContent>("Content", contentSchema);


// export model 
export default Content