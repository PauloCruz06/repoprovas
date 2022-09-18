import * as testsRepository from "../repositories/testsRepository";

export async function registerTest(
    name: string,
    pdfUrl: string,
    categoryName: string,
    disciplineName: string,
    teacherName: string
) {
    const category = await testsRepository.findCategoryByName(categoryName);
    if(!category)
        throw { code: 'NotFound', message: `Category does not exist` };
    
    const discipline = await testsRepository.findDisciplineByName(disciplineName);
    if(!discipline)
        throw { code: 'NotFound', message: `Discipline does not exist` };

    const teacher = await testsRepository.findTeacherByName(teacherName);
    if(!teacher)
        throw { code: 'NotFound', message: `Teacher does not exist` };

    const teacherDisciplineId = await
        testsRepository.insertTeacherDiscipline(discipline.id, teacher.id);
    
    const testId = await testsRepository.insertTest({
        name,
        pdfUrl,
        categoryId: category.id,
        teacherDisciplineId
    });

    return testId;
}