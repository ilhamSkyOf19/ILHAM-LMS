import express, { Router } from 'express';
import { CreateManagerRequest, UpdateManagerRequest } from '../models/manager-model';
import { ManagerValidation } from '../validation/manager-validation';
import ValidationRequest from '../middlewares/validation-request';
import { ManagerController } from '../controllers/manager.controller';

// initialize route
const managerRoute: Router = express.Router();


// create
managerRoute.post('/create', ValidationRequest<CreateManagerRequest>(ManagerValidation.CREATE), ManagerController.create);


// update 
managerRoute.patch('/update/:id', ValidationRequest<UpdateManagerRequest>(ManagerValidation.UPDATE), ManagerController.update);


// export default 
export default managerRoute

