import { Schema, model } from "mongoose";
import { ICourse } from "../models/course-model";
import Manager from "./manager-schema";
import Category from "./category-schema";



// model 
const courseSchema = new Schema<ICourse>(
    {
        name: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        tagline: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: "Manager",
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            // required: true
        },
        contents: [{
            type: Schema.Types.ObjectId,
            ref: "Content",
            // required: true
        }]
    },
    { timestamps: true }
)


// update manager & category if create 
courseSchema.post('save', async (doc) => {
    try {
        // update manager
        await Manager.findByIdAndUpdate({
            _id: doc.manager
        }, {
            $push: {
                courses: doc._id
            }
        })

        // update category
        await Category.findByIdAndUpdate({
            _id: doc.category
        }, {
            $push: {
                courses: doc._id
            }
        })


    } catch (error) {
        console.log(error);
    }
})



// delete 
courseSchema.post('findOneAndDelete', async function (doc) {
    try {
        // delete course in manager 
        await Manager.findByIdAndUpdate({
            _id: doc.manager
        }, {
            $pull: {
                courses: doc._id
            }
        })


        // delete course in category 
        await Category.findByIdAndUpdate({
            _id: doc.category
        }, {
            $pull: {
                courses: doc._id
            }
        })

    } catch (error) {

    }
})

// update category 
courseSchema.post('findOneAndUpdate', async function (doc) {
    try {

        // update category
        await Category.findByIdAndUpdate({
            _id: doc.category
        }, {
            $push: {
                courses: doc._id
            }
        })

    } catch (error) {
        console.log(error);
    }
})


// create model
const Course = model<ICourse>("Course", courseSchema);



// export model
export default Course;