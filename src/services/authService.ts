import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as authRepository from "../repositories/authRepository";

dotenv.config();

export async function signUp(email: string, password: string, confirmPassword: string) {
    const hasUser = await authRepository.findUserByEmail(email);
    if(hasUser)
        throw { code: 'Conflict', message: 'User already registered' };

    if(password !== confirmPassword)
        throw { code: 'UnprocessableEntity', message: 'password confirmation is invalid' };

    const hashPassword = bcrypt.hashSync(password, 10);
    await authRepository.createUser({
        email: email,
        password: hashPassword
    });
}

export async function signIn(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);
    if(!user)
        throw { code: 'Unauthorized', message: 'Invalid password!' };

    const compareHash = bcrypt.compareSync(password, user.password);
    if(!compareHash)
        throw { code: 'Unauthorized', message: 'Invalid password!' };
    
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        }, process.env.SECRET || 'secret', {
            expiresIn: 1800
        }
    );
    return {
        id: user.id,
        email: user.email,
        token
    };
}
