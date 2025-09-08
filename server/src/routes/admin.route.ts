import { Router } from 'express'
import { AdminController } from '../controllers/admin.controller';
import { CreateAdminRequest } from '../models/admin-mode';
import { AdminValidation } from '../validation/admin-validation';
import ValidationRequest from '../middlewares/validation-request';

// initialize route
const adminRoute: Router = Router();

// create admin 
adminRoute.post(
    '/create',
    ValidationRequest<CreateAdminRequest>(AdminValidation.CREATE),
    AdminController.create);




// export default 
export default adminRoute