import { Router } from "express";
import tokenMiddleware from "../middlewares/token-middleware";
import { AuthController } from "../controllers/auth.controller";


const authRoute: Router = Router();


// get auth manager
authRoute.get('/auth/manager', tokenMiddleware("MANAGER"), AuthController.getAuth)


// get auth manager
authRoute.get('/auth/student', tokenMiddleware("STUDENT"), AuthController.getAuth)



export default authRoute