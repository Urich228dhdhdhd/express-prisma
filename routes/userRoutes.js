const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUserById, updateUser, findUserToLogin } = require('../controllers/userController');


// Получить всех пользователей
router.get('/', async (request, response) => {
    try {
        const users = await getUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        response.status(500).json({ message: 'Ошибка при получении пользователей' });
    }
});

// Получить пользователя по ID
router.get('/:id', async (request, response) => {
    try {
        const user = await getUserById(Number(request.params.id));
        if (!user) {
            return response.status(404).json({ message: 'Пользователь не найден' });
        }
        response.status(200).json(user);
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        response.status(404).json({ message: 'Пользователь не найден' });
    }
});

// Создать нового пользователя
router.post('/', async (request, response) => {
    const { username, password, role, first_name, middle_name, last_name } = request.body;
    if (!username || !password || !role || !first_name || !middle_name || !last_name) {
        return response.status(400).json({ message: 'Все поля обязательны' });
    }
    try {
        const user = await createUser(username, password, role, first_name, middle_name, last_name);

        response.status(201).json(user);
    } catch (error) {
        if (error.code === 'P2002') {

            return response.status(409).json({ message: 'Пользователь с таким логином уже существует' });
        }
        console.error('Ошибка при создании пользователя:', error);
        response.status(500).json({ message: 'Ошибка при создании пользователя' });
    }
});
// Обновить пользователя
router.put('/:id', async (request, response) => {
    const { username, password, role, first_name, middle_name, last_name } = request.body;
    const userId = Number(request.params.id);

    try {

        const existingUser = await getUserById(userId);
        if (!existingUser) {
            return response.status(404).json({ message: 'Пользователь не найден' });
        }


        const updatedUser = await updateUser(userId, username, password, role, first_name, middle_name, last_name);
        response.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 'P2002') {

            return response.status(409).json({ message: 'Пользователь с таким логином уже существует' });
        }
        console.error('Ошибка при обновлении пользователя:', error);
        response.status(500).json({ message: 'Ошибка при обновлении пользователя' });
    }
});


// Удалить пользователя по ID
router.delete('/:id', async (request, response) => {
    try {
        await deleteUserById(Number(request.params.id));
        response.status(204).send(); // Успешное удаление, но без контента
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
        response.status(404).json({ message: 'Пользователь не найден' });
    }
});


// Вход пользователя
router.post("/login", async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({ message: 'Логин и пароль обязательны' });
    }

    try {
        const user = await findUserToLogin(username, password);
        return response.status(200).json({ user });
    } catch (error) {
        if (error.message === 'Ошибка логина и пароля') {
            return response.status(401).json({ message: 'Неверный логин или пароль' });
        }

        return response.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
});


module.exports = router;
