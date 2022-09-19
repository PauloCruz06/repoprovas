import { prisma } from "../src/config/database";
import app from "../src/app";
import supertest from "supertest";
import testsFactory from "./factories/testsFactory";
import userFactory from "./factories/userFactory";

beforeEach( async() => {
    await prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`;
});

describe("Test route Post '/register/tests'", () => {
    it("must return an object and a 201 status code", async() => {
        const test = testsFactory();
        const user =  userFactory();

        const userSignUp = { ...user, confirmPassword: user.password };
        await supertest(app).post('/signup').send(userSignUp);
        const login = await supertest(app).post('/signin').send(user);
        const result = await supertest(app)
            .post('/register/tests')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(test);
        
        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("must return a 404 status code when trying to register with unregistered category/discipline/teacher name", async() => {
        const user =  userFactory();

        const testCategory = { ...testsFactory(), categoryName: "blabla" };
        const testDiscipline = { ...testsFactory(), disciplineName: "blabla" };
        const testTeacher = { ...testsFactory(), teacherName: "blabla" };

        const userSignUp = { ...user, confirmPassword: user.password };
        await supertest(app).post('/signup').send(userSignUp);
        const login = await supertest(app).post('/signin').send(user);
        
        const resultCategory = await supertest(app)
            .post('/register/tests')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(testCategory);
        const resultDiscipline = await supertest(app)
            .post('/register/tests')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(testDiscipline);
        const resultTeacher = await supertest(app)
            .post('/register/tests')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(testTeacher);

        expect(resultCategory.status).toBe(404);
        expect(resultDiscipline.status).toBe(404);
        expect(resultTeacher.status).toBe(404);
    });

    it("must return a 401 status code when trying to register without a user token", async() => {
        const test = testsFactory();
        const result = await supertest(app).post('/register/tests').send(test);

        expect(result.status).toBe(401);
    });
});

describe ("Test route Get '/tests/disciplines'", () => {
    it("must return a 404 status code if there are no tests registered", async() => {
        const user =  userFactory();

        const userSignUp = { ...user, confirmPassword: user.password };
        await supertest(app).post('/signup').send(userSignUp);
        const login = await supertest(app).post('/signin').send(user);
        const result = await supertest(app)
            .get('/tests/disciplines')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send();

        expect(result.status).toBe(404);
    });
    
    it("must return an object and a 200 status code", async() => {
        const test = testsFactory();
        const user =  userFactory();

        const userSignUp = { ...user, confirmPassword: user.password };
        await supertest(app).post('/signup').send(userSignUp);
        const login = await supertest(app).post('/signin').send(user);
        
        await supertest(app)
            .post('/register/tests')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(test);
        const result = await supertest(app)
            .get('/tests/disciplines')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send();
        
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });
});

afterAll( async() => {
    await prisma.$disconnect();
});