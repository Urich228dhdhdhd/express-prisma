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
const createSemester = async (semester_number, semester_year) => {
    const semester = await prisma.semester.create({
        data: {
            semester_number: semester_number,
            semester_year: semester_year,
        }
    })
    return semester
}
const updateSemesterById = async (id, semester_number, semester_year) => {
    const data = {};
    if (semester_number) {
        data.semester_number = semester_number
    }
    if (semester_year) {
        data.semester_year = semester_year
    }
    const semester = await prisma.semester.update({
        where: {
            id: id
        },
        data: data
    })
    return semester
}
const deleteSemesterById = async (id) => {
    const semester = await prisma.semester.delete({
        where: {
            id: id
        }
    })
    return semester
}




module.exports = { getSemesters, getSemesterById, createSemester, deleteSemesterById, updateSemesterById };
