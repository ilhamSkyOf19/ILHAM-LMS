import { model, Schema } from "mongoose";
import { ITraansactionCourse } from "../models/transaction-course-model";



// shcema 
const transactionCourseSchema = new Schema<ITraansactionCourse>({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        index: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
        required: true
    }
}, {
    timestamps: true
})

// index compud 
transactionCourseSchema.index({
    student: 1,
    course: 1,
    status: 1
})


// create model 
const TransactionCourse = model<ITraansactionCourse>("TransactionCourse", transactionCourseSchema);


// export 
export default TransactionCourse;