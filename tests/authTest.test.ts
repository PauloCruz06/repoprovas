import { prisma } from "../src/config/database";
import app from "../src/app";
import supertest from "supertest";
import userFactory from "./factories/userFactory";

beforeAll( async() => (
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
));

describe("Test route Post '/signup'", () =>{
    it("must return a 201 status code", async() => {
        const user = userFactory();
        const userSignUp = {...user, confirmPassword: user.password};
        const result = await supertest(app).post('/signup').send(userSignUp);
        
        expect(result.status).toBe(201);
    });

    it("must return a 409 status code when trying to register an already registered user", async() => {
        const user = userFactory();
        const userSignUp = {...user, confirmPassword: user.password};
        await supertest(app).post('/signup').send(userSignUp);
        const result = await supertest(app).post('/signup').send(userSignUp);

        expect(result.status).toBe(409);
    });

    it("must return a 422 status code when trying to register without password confimation", async() => {
        const user = userFactory();
        const result = await supertest(app).post('/signup').send(user);

        expect(result.status).toBe(422);
    });

    it("must return a 422 status code when trying to register email/password/passwordConfirm invalid", async() => {
        const emailInvalid = { ...userFactory(), email: "blablabla" };
        const passwordInvalid = { ...userFactory(), password: "bla1" };
        const passwordConfirmInvalid = { ...userFactory(), passwordConfirm: "bla1" };

        const resultEmail = await supertest(app).post('/signup').send(emailInvalid);
        const resultPassword = await supertest(app).post('/signup').send(passwordInvalid);
        const resultConfirm = await supertest(app).post('/signup').send(passwordConfirmInvalid);

        expect(resultEmail.status).toBe(422);
        expect(resultPassword.status).toBe(422);
        expect(resultConfirm.status).toBe(422);
    });
});

afterAll( async() => {
    await prisma.$disconnect();
});