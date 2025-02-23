const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMarks = async () => {
    const markArj = await prisma.mark.findMany();
    return markArj;
};
const getMarkById = async (id) => {
    const markArj = await prisma.mark.findUnique({
        where: {
            id: id
        }
    })
    return markArj;
}
const getMarksByStudentIdSemesterIdsSubjectIds = async (student_id, semester_ids, subject_ids) => {
    const markArj = await prisma.mark.findMany({
        where: {
            student_id: student_id,
            semester_id: {
                in: semester_ids
            },
            subject_id: {
                in: subject_ids
            }
        }
    })
    return markArj;
}

const getFilteredMarks = async (group_id, semester_number, subject_id, semester_year) => {
    const semesterExists = await prisma.semester.findFirst({
        where: {
            semester_number: semester_number,
            semester_year: semester_year,
        },
    });
    if (!semesterExists) {
        console.log("семестор не найден");
        return null;

    }
    console.log(semesterExists)
    const marks = await prisma.mark.findMany({
        where: {
            subject_id: subject_id,
            student: {
                group_id: group_id,
            },
            semester: {
                semester_number: semester_number,
                semester_year: semester_year
            },
        }
    });


    // console.log(marks);
    return marks;
};

const createMark = async (student_id, semester_id, subject_id, mark, is_exam) => {
    const markArj = await prisma.mark.create({
        data: {
            student_id: student_id,
            semester_id: semester_id,
            subject_id: subject_id,
            mark: mark,
            is_exam: is_exam,
        }
    })
    return markArj;
}
const updateMark = async (id, student_id, semester_id, subject_id, mark, is_exam) => {
    const data = {};
    if (student_id) {
        data.student_id = student_id
    }
    if (semester_id) {
        data.semester_id = semester_id
    }
    if (subject_id) {
        data.subject_id = subject_id
    }
    if (mark) {
        data.mark = mark
    }
    if (typeof is_exam === 'boolean') {
        data.is_exam = is_exam
    }
    const markArj = await prisma.mark.update({
        where: {
            id: id
        },
        data: data
    })
    return markArj
}
const deleteMarkById = async (id) => {
    const markArj = await prisma.mark.delete({
        where: {
            id: id
        }
    })
    return markArj;
}


module.exports = { getMarks, getMarkById, createMark, updateMark, deleteMarkById, getFilteredMarks, getMarksByStudentIdSemesterIdsSubjectIds };
