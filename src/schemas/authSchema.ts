import Joi from "joi";

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password')
});

export default authSchema;