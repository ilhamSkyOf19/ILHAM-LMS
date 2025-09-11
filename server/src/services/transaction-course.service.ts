import { CreateTransactionCourseRequest } from "../models/transaction-course-model";
import Course from "../schema/course-schema";
import Student from "../schema/student-schema";
import TransactionCourse from "../schema/transaction-course-schema";
import { ResponseData } from "../types/types";
import { PaymentService } from "./payment.service";



export class TransactionCourseService {
    // create 
    static async create(req: CreateTransactionCourseRequest): Promise<ResponseData<string>> {


        // cek course 
        const course = await Course.findById(req.course);

        // cek find course
        if (!course) {
            return {
                success: false,
                message: 'course not found'
            }
        }


        // cek student 
        const student = await Student.findById(req.student);

        // cek find student
        if (!student) {
            return {
                success: false,
                message: 'student not found'
            }
        }



        // cek transaction 
        const findTransaction = await TransactionCourse.findOne({
            course: req.course,
            student: req.student
        });


        // cek find transaction 
        if (findTransaction) {
            // cek success 
            if (findTransaction.status === 'success') {
                return {
                    success: false,
                    message: 'you already buy this course'
                }
            } else if (findTransaction.status === 'pending') {
                return {
                    success: false,
                    message: 'you already buy this course'
                }
            } else {
                // delete transaction
                await findTransaction.deleteOne();
            }
        }

        // create transaction 
        const transaction = await TransactionCourse.create({
            student: student._id,
            course: course._id,
            status: 'pending'
        })


        // cek transaction 
        if (!transaction) {
            return {
                success: false,
                message: 'transaction failed'
            }
        }


        // conver to object 
        const response = transaction.toObject();


        // payment 
        const payment = await PaymentService.payment({
            id_transaction: response._id as string,
            email_user: student.email,
            price: course.price,
            name: 'course'
        }, 'new')


        // cek payment 
        if (!payment.success) return payment;


        // return 
        return {
            success: true,
            data: payment.data.redirect_url
        }

    }
}