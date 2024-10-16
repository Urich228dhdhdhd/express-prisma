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
            id: id
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

module.exports = { getGroups, getGroupById, createGroup, deleteGroupById, updateGroup };