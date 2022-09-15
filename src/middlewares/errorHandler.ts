import { Request, Response, NextFunction } from "express";
import { errorData } from "../types/errorType.js";

export function errorHandler(
    error: Error | any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);

    if(error.code) {
        const errorCode = errorTypeByCode(error);
        return res.status(errorCode).send(error.message);
    }
 
    res.sendStatus(500);
}

function errorTypeByCode(errorType: errorData) {
    if(errorType.code === 'NotFound')
        return (404);   
    if(errorType.code === 'UnprocessableEntity')
        return (422);   
    if(errorType.code === 'Conflict')
        return (409);  
    if(errorType.code === 'Unauthorized')
        return (401);

    return (500);
}