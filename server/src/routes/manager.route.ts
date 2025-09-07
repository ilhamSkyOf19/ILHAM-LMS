import express, { Router } from 'express';
import { CreateManagerRequest } from '../models/manager-model';
import { ManagerValidation } from '../validation/manager-validation';
import ValidationRequest from '../middlewares/validation-request';
import { ManagerController } from '../controllers/manager.controller';

// initialize route
const managerRoute: Router = express.Router();


// create
managerRoute.post('/create', ValidationRequest<CreateManagerRequest>(ManagerValidation.CREATE), ManagerController.create);


// export default 
export default managerRoute

