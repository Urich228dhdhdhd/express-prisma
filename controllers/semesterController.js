const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const getSemesters = async () => {
    const semester = await prisma.semester.findMany();
    return semester;
}
const getSemesterById = async (id) => {
    const semester = await prisma.semester.findUnique({
        where: {
            id: id
        }
    })
    return semester
}
const getSemestersByGroupId = async (group_id) => {
    const semesters = await prisma.semester.findMany({
        where: {
            ListOfSubject: {
                some: {
                    group_id: group_id

                }
            }
        }
    })
    return semesters;
}
const getSemestersByIds = async (ids) => {
    const semesters = await prisma.semester.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
    return semesters
}

const getSemesterByNumberAndYear = async (semester_number, semester_year) => {
    const semester = await prisma.semester.findFirst({
        where: {
            semester_number: semester_number,
            semester_year: semester_year,
        }
    })
    return semester
}
const createSemester = async (semester_number, semester_year, semester_part) => {
    const semester = await prisma.semester.create({
        data: {
            semester_number: semester_number,
            semester_year: semester_year,
            semester_part: semester_part, // Новое поле
        }
    });
    return semester;
}

const updateSemesterById = async (id, semester_number, semester_year, semester_part) => {
    const data = {};
    if (semester_number) {
        data.semester_number = semester_number;
    }
    if (semester_year) {
        data.semester_year = semester_year;
    }
    if (semester_part) { // Проверка на обновление semester_part
        data.semester_part = semester_part;
    }
    const semester = await prisma.semester.update({
        where: { id: id },
        data: data
    });
    return semester;
}
const deleteSemesterById = async (id) => {
    const semester = await prisma.semester.delete({
        where: {
            id: id
        }
    })
    return semester
}




module.exports = { getSemesters, getSemesterById, createSemester, deleteSemesterById, updateSemesterById, getSemesterByNumberAndYear, getSemestersByIds, getSemestersByGroupId };
