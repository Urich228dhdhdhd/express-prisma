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
const getlistOfSubjectByGroupId = async (group_id) => {
    const listofSub = await prisma.listOfSubject.findMany({
        where: {
            group_id: group_id
        }
    })
    return listofSub;

}

const getlistOfSubjectBySubGroupId = async (subject_id, group_id) => {
    const listofSub = await prisma.listOfSubject.findMany({
        where: {
            group_id:group_id,
            subject_id: subject_id,
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
// Удаление листа по group_id, subject_id и semester_number
const deleteListOfSubjectByGroupIdSubjectIdAndSemester = async (group_id, subject_id, semester_number) => {
    const deletedRecords = await prisma.listOfSubject.deleteMany({
        where: {
            group_id: group_id,
            subject_id: subject_id,
            semester_number: semester_number,
        },
    });
    return deletedRecords; // Возвращаем количество удаленных записей
};


    // Проверка наличия записи по группе, предмету и номеру семестра
const checkListOfSubjectExists = async (subject_id, group_id, semester_number) => {
    const existingRecord = await prisma.listOfSubject.findFirst({
        where: {
            subject_id: subject_id,
            group_id: group_id,
            semester_number: semester_number
        }
    });
    return existingRecord !== null; // Возвращаем true, если запись найдена, иначе false
};
const getSubjectIdsByGroupId = async (groupId) => {
    const subjects = await prisma.listOfSubject.findMany({
        where: {
            group_id: groupId
        },
        select: {
            subject_id: true,
            subject: {
                select: {
                    subject_name_short: true ,// Получаем краткое имя предмета
                    subject_name_long:true,
                }
            }
        },
        distinct: ['subject_id'] // Исключаем дубликаты subject_id
    });

    return subjects;
};

  







module.exports = { getlistOfSubject, getlistOfSubjectById, createLostOfSubject, deletelistofSubById,updateListOfSub, getlistOfSubjectByGroupId,getlistOfSubjectBySubGroupId,checkListOfSubjectExists,deleteListOfSubjectByGroupIdSubjectIdAndSemester ,getSubjectIdsByGroupId};
