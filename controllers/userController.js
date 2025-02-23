const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");





const getUsers = async () => {
    const user = await prisma.user.findMany();
    return user;
};


const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });
    return user;
};


const createUser = async (username, password, role, first_name, middle_name, last_name) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const obj = await prisma.user.create({
        data: {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            username: username,
            password: passwordHash,
            role: role
        }
    })
    return obj;
}
const deleteUserById = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id: id
        }
    });
    return user;
};
const updateUser = async (id, username, password, role, first_name, middle_name, last_name) => {
    const data = {};
    if (username) {
        data.username = username
    }
    if (password) {
        const passwordHash = await bcrypt.hash(password, 10);
        data.password = passwordHash;
    }
    if (role) {
        data.role = role
    }
    if (first_name) {
        data.first_name = first_name
    }
    if (middle_name) {
        data.middle_name = middle_name
    }
    if (last_name) {
        data.last_name = last_name
    }
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: data
    })
    return user

};

const findUserToLogin = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if (!user) {
        throw new Error('Ошибка логина и пароля');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Ошибка логина и пароля');
    }

    return user;
};

module.exports = { getUsers, getUserById, createUser, deleteUserById, updateUser, findUserToLogin };
