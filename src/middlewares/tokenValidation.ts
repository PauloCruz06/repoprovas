import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function tokenValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
        
    jwt.verify(token, process.env.SECRET || "secret", (e, decoded) => {
        if(e) return res.status(401).send(e.message);
            
        res.locals.user = decoded;
        next()
    });
}