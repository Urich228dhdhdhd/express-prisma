const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getGroups = async () => {
    const group = await prisma.group.findMany({
    });
    return group;
}
const getGroupById = async (id) => {
    const group = await prisma.group.findUnique({
        where: {
            id: Number(id),
        }
    })
    return group;
};
const createGroup = async (group_name, curator_id, status_group, semester_number) => {
    const group = await prisma.group.create({
        data: {
            group_name: group_name,
            curator_id: curator_id,
            status_group: status_group,
            semester_number: semester_number,
        }
    });
    return group;
};
const deleteGroupById = async (id) => {
    const group = await prisma.group.delete({
        where: {
            id: id
        }
    })
    return group;
};
// Обнавление группы
const updateGroup = async (id, group_name, curator_id, status_group, semester_number) => {
    const data = {};
    if (group_name) {
        data.group_name = group_name
    }
    if (curator_id !== undefined) {
        data.curator_id = curator_id;
    }
    if (status_group) {
        data.status_group = status_group
    }
    if (semester_number) {
        data.semester_number = semester_number
    }
    const group = await prisma.group.update({
        where: {
            id: id
        },
        data: data
    })
    console.log(group)
    return group;
}
const getGroupByRole = async (curator_id, role) => {
    // console.log('curator_id:', curator_id, 'role:', role); // Для отладки

    let groups;
    if (role == "CURATOR") {
        groups = await prisma.group.findMany({
            where: {
                curator_id: curator_id,
            },
            include: {
                _count: {
                    select: {
                        student: true,
                    }
                }
            }
        });
    } else if (role == "ADMINISTRATOR") {
        groups = await prisma.group.findMany({
            include: {
                _count: {
                    select: {
                        student: true,
                    }
                }
            }
        });
    }

    // Преобразование данных: извлечение числовой части, сортировка и подготовка результата
    const result = groups
        .map(group => {
            // Извлекаем числовую часть из названия группы
            const numberPart = parseInt(group.group_name.match(/^\d+/), 10); // Извлекаем начальные цифры
            return {
                id: group.id,
                group_name: group.group_name,
                student_count: group._count.student,
                numberPart: isNaN(numberPart) ? Infinity : numberPart, // Если числовая часть не найдена, присваиваем максимально большое значение
            };
        })
        .filter(group => !isNaN(group.numberPart)) // Оставляем только те, у которых есть числовая часть
        .sort((a, b) => a.numberPart - b.numberPart) // Сортируем по числовой части от меньшего к большему
        .map(group => {
            // Убираем временное поле `numberPart` перед возвратом результата
            return {
                id: group.id,
                group_name: group.group_name,
                student_count: group.student_count,
            };
        });

    return result;
};

const getGroupByRole2 = async (curator_id, role) => {
    console.log('curator_id:', curator_id, 'role:', role); // Для отладки

    let groups;
    if (role == "CURATOR") {
        groups = await prisma.group.findMany({
            where: {
                curator_id: curator_id,
            },
        });
    } else if (role == "ADMINISTRATOR") {
        groups = await prisma.group.findMany({

        });
    }

    // Преобразование данных: извлечение числовой части, сортировка и подготовка результата
    const result = groups
        .map(group => {
            // Извлекаем числовую часть из названия группы
            const numberPart = parseInt(group.group_name.match(/^\d+/), 10); // Извлекаем начальные цифры
            return {
                ...group, // Включаем все свойства группы
                numberPart: isNaN(numberPart) ? Infinity : numberPart, // Если числовая часть не найдена, присваиваем максимально большое значение
            };
        })
        .filter(group => !isNaN(group.numberPart)) // Оставляем только те, у которых есть числовая часть
        .sort((a, b) => a.numberPart - b.numberPart) // Сортируем по числовой части от меньшего к большему
        .map(group => {
            // Убираем временное поле `numberPart` перед возвратом результата
            return group
        });

    return result;
}


module.exports = { getGroups, getGroupById, createGroup, deleteGroupById, updateGroup, getGroupByRole, getGroupByRole2 };