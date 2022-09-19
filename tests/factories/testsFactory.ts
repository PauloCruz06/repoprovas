import { faker, Faker } from "@faker-js/faker";

export default function testsFactory() {
    return {
        name: faker.lorem.word(),
        pdfUrl: faker.internet.url(),
        categoryName: "Projeto",
        disciplineName: "React",
        teacherName: "Diego Pinho"
    }
}