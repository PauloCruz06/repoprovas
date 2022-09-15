import { faker } from "@faker-js/faker"; 

export default function userFactory() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(6)
    }
}