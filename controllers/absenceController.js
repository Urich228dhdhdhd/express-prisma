const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAbsences = async () => {
    const absences = await prisma.absence.findMany({
    })
    return absences;
}
const getAbsencesById = async (id) => {
    const absences = await prisma.absence.findUnique({
        where: {
            id: id
        }
    })
    return absences;
}
const createAbsence = async (student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp) => {
    const absence = await prisma.absence.create({
        data: {
            student_id: student_id,
            year: year,
            month: month,
            absence_illness: absence_illness,
            absence_order: absence_order,
            absence_resp: absence_resp,
            absence_disresp: absence_disresp
        }
    })
    return absence;
}
const updateAbsencesById = async (id, student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp) => {
    const data = {};
    // Проверяем только на наличие значения
    if (student_id) {
        data.student_id = student_id;
    }
    if (year) {
        data.year = year;
    }
    if (month) {
        data.month = month;
    }
    if (absence_illness) {
        data.absence_illness = absence_illness;
    }
    if (absence_order) {
        data.absence_order = absence_order;
    }
    if (absence_resp) {
        data.absence_resp = absence_resp;
    }
    if (absence_disresp) {
        data.absence_disresp = absence_disresp;
    }
    const absence = await prisma.absence.update({
        where: {
            id: id
        },
        data: data
    });

    return absence;
};

const deleteAbsencesById = async (id) => {
    const absence = await prisma.absence.delete({
        where: {
            id: id
        }
    })
    return absence
}



module.exports = { getAbsences, getAbsencesById, deleteAbsencesById, createAbsence, updateAbsencesById };
