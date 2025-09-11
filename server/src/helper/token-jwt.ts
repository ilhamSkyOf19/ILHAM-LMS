import { JWTPayloadType } from "../models/jwt-model";
import jwt from "jsonwebtoken";


const tokenJWT = (req: JWTPayloadType): string => {

    // get payload
    const payload = {
        id: req.id,
        name: req.name,
        email: req.email,
        role: req.role
    } as JWTPayloadType;


    // generate jwt 
    const token: string = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1h" });

    return token;
}

export default tokenJWT;