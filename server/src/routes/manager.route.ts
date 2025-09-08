import express, { Router } from 'express';
import { CreateManagerRequest, UpdateManagerRequest } from '../models/manager-model';
import { ManagerValidation } from '../validation/manager-validation';
import ValidationRequest from '../middlewares/validation-request';
import { ManagerController } from '../controllers/manager.controller';
import tokenMiddleware from '../middlewares/token-middleware';

// initialize route
const managerRoute: Router = express.Router();


// create
managerRoute.post('/create', ValidationRequest<CreateManagerRequest>(ManagerValidation.CREATE), ManagerController.create);


// update 
managerRoute.patch('/update', tokenMiddleware("MANAGER"), ValidationRequest<UpdateManagerRequest>(ManagerValidation.UPDATE), ManagerController.update);



// delete 
managerRoute.delete('/delete/:id', tokenMiddleware("ADMIN"), ManagerController.delete);


// export default 
export default managerRoute

