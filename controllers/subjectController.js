const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSubjects = async () => {
    const subjects = await prisma.subject.findMany();
    console.log(subjects)
    return subjects;
}
const getSubjectById = async (id) => {
    const subject = await prisma.subject.findUnique({
        where: {
            id: id
        }
    })
    console.log(subject)
    return subject;

}
const createSubject = async (subject_name_short, subject_name_long) => {
    const subject = await prisma.subject.create({
        data: {
            subject_name_short: subject_name_short,
            subject_name_long: subject_name_long
        }
    })
    return subject;
}
const deleteSubject = async (id) => {
    const subject = await prisma.subject.delete({
        where: {
            id: id
        }
    })
    return subject
}
const updateSubject = async (id, subject_name_short, subject_name_long) => {
    const data = {};
    if (subject_name_short) {
        data.subject_name_short = subject_name_short
    }
    if (subject_name_long) {
        data.subject_name_long = subject_name_long
    }
    const subject = await prisma.subject.update({
        where: {
            id: id
        },
        data: data
    })
    return subject;

}






module.exports = { getSubjects, getSubjectById, createSubject, deleteSubject, updateSubject };
