import { prisma } from "../src/config/database";

async function main() {
    const categories = ['Projeto', 'Prática', 'Recuperação'];
    const teachers = ['Diego Pinho', 'Bruna Hamori'];
    const disciplines = [
        { name: 'HTML e CSS', id: 1 },
        { name: 'JavaScript', id: 2 },
        { name: 'React', id: 3 },
        { name: 'Humildade', id: 3 },
        { name: 'Planejamento', id: 2 },
        { name: 'Autoconfiança', id: 3 }
    ];
    const teachersDis = [[1,1],[1,2],[1,3],[2,4],[2,5],[2,6]];

    for(let i=1; i<=6; i++) {
        await prisma.terms.upsert({
            where: { number: i },
            update: {},
            create: { number: i }
        });
    };

    categories.forEach(async(category) => {
        await prisma.categories.upsert({
            where: { name: category },
            update: {},
            create: { name: category }
        });
    });

    teachers.forEach(async(teacher) => {
        await prisma.teachers.upsert({
            where: { name: teacher },
            update: {},
            create: { name: teacher }
        });
    });

    disciplines.forEach(async(discipline) => {
        await prisma.disciplines.upsert({
            where: { name: discipline.name },
            update: {},
            create: { name: discipline.name, termId: discipline.id }
        });
    });

    teachersDis.forEach(async(teacherDis, index) => {
        await prisma.teachersDisciplines.upsert({
            where: { id: index+1 },
            update: {},
            create: {
                id: index+1,
                teacherId: teacherDis[0],
                disciplineId: teacherDis[1]
            }
        });
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    }).finally(() =>
        prisma.$disconnect()
    );