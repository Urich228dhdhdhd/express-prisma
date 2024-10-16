const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
// получение всех листов
const getlistOfSubject = async () => {
    const listofSub = await prisma.listOfSubject.findMany({
        // include: {
        //     group: {
        //         select: {
        //             id: true,
        //             group_name: true,
        //         }
        //     },
        //     subject: {
        //         select: {
        //             id: true,
        //             subject_name_short: true,
        //         }
        //     }
        // }
    })
    return listofSub;
}

// получение  листа по id
const getlistOfSubjectById = async (id) => {
    const listofSub = await prisma.listOfSubject.findUnique({
        where: {
            id: id
        }
    })
    return listofSub;

}
// Создание листа
const createLostOfSubject = async (subject_id, group_id, semester_number) => {
    const listofSub = await prisma.listOfSubject.create({
        data: {
            subject_id: subject_id,
            group_id: group_id,
            semester_number: semester_number
        }
    })
    return listofSub;
}
// Удаление листа
const deletelistofSubById = async (id) => {
    const listofSub = await prisma.listOfSubject.delete({
        where: {
            id: id
        }
    })
    return listofSub;
}
// Обновление листа
const updateListOfSub = async (id, subject_id, group_id, semester_number) => {
    const data = {};
    if (subject_id) {
        data.subject_id = subject_id
    }
    if (group_id) {
        data.group_id = group_id
    }
    if (semester_number) {
        data.semester_number = semester_number
    }
    const listofSub = await prisma.listOfSubject.update({
        where: {
            id: id
        },
        data: data
    })
    return listofSub;

}





module.exports = { getlistOfSubject, getlistOfSubjectById, createLostOfSubject, deletelistofSubById, updateListOfSub };
