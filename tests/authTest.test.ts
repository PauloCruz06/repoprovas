import { prisma } from "../src/config/database";
import app from "../src/app";
import supertest from "supertest";
import userFactory from "./factories/userFactory";

beforeEach( async() => (
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`   
));

describe("Test route Post '/signup'", () => {
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
});

describe("Test route Post '/signin'", () => {
    it("must return a 200 status code and an object", async() => {
        const user =  userFactory();
        const userSignUp = { ...user, confirmPassword: user.password };
        await supertest(app).post('/signup').send(userSignUp);
        const result = await supertest(app).post('/signin').send(user);
  
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("must return a 404 status code when trying to login with an unregistered email", async() => {
        const user = userFactory();
        const result = await supertest(app).post('/signin').send(user);

        expect(result.status).toBe(404);
    });

    it("must return a 401 status code when trying to login with an invalid password", async() => {
        const user =  userFactory();
        const userSignUp = { ...user, confirmPassword: user.password };
        await supertest(app).post('/signup').send(userSignUp);
        const result = await supertest(app).post('/signin').send({...user, password: "_______"});

        expect(result.status).toBe(401);
    });
});

afterAll( async() => {
    await prisma.$disconnect();
});