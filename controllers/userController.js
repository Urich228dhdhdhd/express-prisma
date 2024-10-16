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


const createUser = async (username, password, role) => {
    const passwordHash = await bcrypt.hash(password,10);
    const obj = await prisma.user.create({
        data: {
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
const updateUser = async (id, username, password, role) => {
    const data = {};
    if (username) {
        data.username = username
    }
    if (password) {
        const passwordHash = await bcrypt.hash(password,10);
        data.password = passwordHash;
    }
    if (role) {
        data.role = role
    }
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: data
    })
    return user

};

const findUserToLogin = async (username,password)=>{
    const user = await prisma.user.findUnique({
        where:{
            username:username,
        }
    });
    if (!user) {
        throw new Error('Пользователь с таким логином не найден');
    }
    const passwordHash = await bcrypt.compare(password,user.password)
    if (passwordHash) {
        return user;
    } else {
        throw new Error('Неправильный пароль');  
    }
    
}

module.exports = { getUsers, getUserById, createUser, deleteUserById, updateUser,findUserToLogin };
