import { Router } from 'express'
import { AdminController } from '../controllers/admin.controller';
import { CreateAdminRequest } from '../models/admin-mode';
import { AdminValidation } from '../validation/admin-validation';
import ValidationRequest from '../middlewares/validation-request';
import { AuthController } from '../controllers/auth.controller';

// initialize route
const adminRoute: Router = Router();

// sign in 
adminRoute.post('/signin', AuthController.adminSignIn);

// create admin 
adminRoute.post(
    '/create',
    ValidationRequest<CreateAdminRequest>(AdminValidation.CREATE),
    AdminController.create);




// export default 
export default adminRoute