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

export async function showTestsbyDisciplines() {
    const disciplinesList = await testsRepository.findAllDisciplines();
    const teachersList = await testsRepository.findAllTeachers();
    const teachersDisciplinesList = await testsRepository.findTeachersDisciplines();
    const termsList = await testsRepository.findAllTerms();
    const testsList = await testsRepository.findAllTests();
    const categorieList = await testsRepository.findAllCategories();

    if(!testsList.length)
        throw { code: 'NotFound', message: 'there are no tests registered' }

    const teachers = teachersDisciplinesList.map( td => ({
        ...td,
        teacherName: teachersList.find( teacher =>
            teacher.id === td.teacherId
        )?.name
    }));
    const tests = testsList.map( tes => ({
        name: tes.name,
        pdfUrl: tes.pdfUrl,
        categoryId: tes.categoryId,
        category: categorieList.find( category =>
            category.id === tes.categoryId
        )?.name,
        teacherName: teachers.find( teacher =>
            teacher.id === tes.teacherDisciplineId
        )?.teacherName,
        disciplineId: teachers.find( discipline =>
            discipline.id === tes.teacherDisciplineId
        )?.disciplineId
    }));
    const categoriesWithTests = categorieList.map( cat => ({
        ...cat,
        tests: tests.filter( tes => cat.id === tes.categoryId )
    }));
    const disciplinesByCategory = disciplinesList.map( dis => ({
        ...dis,
        categories: categoriesWithTests.map( category => ({
            ...category,
            tests: category.tests.filter( test =>
                test.disciplineId === dis.id
            )
        }))
    }));
    const testsObj = termsList.map( term => ({
        term: term.number,
        disciplines: disciplinesByCategory.filter( dis => (
            dis.termId === term.id
        ))
    }));

    return testsObj;
}