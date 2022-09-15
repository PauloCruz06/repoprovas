import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
    const value = (req: Request, res: Response, next: NextFunction) => {
        const body = req.params.id ? req.params : req.body;
        const { error } = schema.validate(body, { abortEarly: false });

        if(error) {
            return res
                .status(422)
                .send(error.details.map((detail: { message: any; }) => detail.message));
        }

        next();
    };

    return value;
}