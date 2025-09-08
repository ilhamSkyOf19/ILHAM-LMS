import { model, Schema } from "mongoose";
import { IAdmin } from "../models/admin-mode";



const adminSchema = new Schema<IAdmin>({
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
        default: "ADMIN",
        required: true
    }
}, {
    timestamps: true
})

// export model 
const Admin = model<IAdmin>("Admin", adminSchema);


// export model 
export default Admin