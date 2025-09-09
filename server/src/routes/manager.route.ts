import express, { Router } from 'express';
import { CreateManagerRequest, UpdateManagerRequest } from '../models/manager-model';
import { ManagerValidation } from '../validation/manager-validation';
import ValidationRequest from '../middlewares/validation-request';
import { ManagerController } from '../controllers/manager.controller';
import tokenMiddleware from '../middlewares/token-middleware';
import { SigninRequest } from '../models/auth-model';
import { AuthValidation } from '../validation/auth-validation';
import { AuthController } from '../controllers/auth.controller';

// initialize route
const managerRoute: Router = express.Router();


// sign in 
managerRoute.post('/signin', ValidationRequest<SigninRequest>(AuthValidation.SIGNIN), AuthController.managerSignIn);



// get detail 
managerRoute.get('/detail', tokenMiddleware("MANAGER"), ManagerController.getDetail);



// create
managerRoute.post('/create', ValidationRequest<CreateManagerRequest>(ManagerValidation.CREATE), ManagerController.create);


// update 
managerRoute.patch('/update', tokenMiddleware("MANAGER"), ValidationRequest<UpdateManagerRequest>(ManagerValidation.UPDATE), ManagerController.update);



// delete 
managerRoute.delete('/delete/:id', tokenMiddleware("ADMIN"), ManagerController.delete);


// export default 
export default managerRoute

