const express = require('express');
const router = express.Router();
const { getGroups, getGroupById, createGroup, deleteGroupById, updateGroup } = require('../controllers/groupController')

// Получение всех групп
router.get('/', async (request, response) => {
    try {
        const groups = await getGroups();
        response.status(200).json(groups);

    } catch (error) {
        console.error('Ошибка при получении групп:', error);
        response.status(500).json({ message: 'Ошибка при получении групп' });
    }

});
// Получение группы по id
router.get('/:id', async (request, response) => {
    try {
        const group = await getGroupById(Number(request.params.id))
        if (!group) {
            return response.status(404).json({ message: 'Группа не найдена' });
        }
        response.status(200).json(group);
    } catch (error) {
        console.error('Ошибка при получении группы:', error);
        response.status(500).json({ message: 'Ошибка при получении группы' });
    }

});
// Создание группы
router.post('/', async (request, response) => {
    const { group_name, curator_id, status_group, semester_number } = request.body;
    try {
        const group = await createGroup(group_name, curator_id, status_group, semester_number);
        response.status(201).json(group);

    } catch (error) {
        console.error('Ошибка при создании группы:', error);
        response.status(500).json({ message: 'Ошибка при создании группы' });
    }

});
// Удаление группы
router.delete('/:id', async (request, response) => {
    try {
        await deleteGroupById(Number(request.params.id));
        response.status(204).send();

    } catch (error) {
        console.error('Ошибка при удалении группы:', error);
        response.status(404).json({ message: 'Группа не найдена' });
    }
});
// Обнавление группы
router.put('/:id', async (request, response) => {
    const { group_name, curator_id, status_group, semester_number } = request.body
    const groupId = Number(request.params.id);

    try {
        const existingGroup = await getGroupById(groupId);
        if (!existingGroup) {
            return response.status(404).json({ message: 'Группа не найдена' });
        }
        const updatedGroup = await updateGroup(groupId, group_name, curator_id, status_group, semester_number);
        response.status(200).json(updatedGroup);
    } catch (error) {
        console.error('Ошибка при обновлении группы:', error);
        response.status(500).json({ message: 'Ошибка при обновлении группы' });
    }
});




module.exports = router;