const express = require('express');
const router = express.Router();
const {
    getlistOfSubject,
    getlistOfSubjectById,
    createLostOfSubject,
    deletelistofSubById,
    updateListOfSub,
    getlistOfSubjectByGroupId,
    getlistOfSubjectBySubGroupId,
    checkListOfSubjectExists,
    deleteListOfSubjectByGroupIdSubjectIdAndSemester,
    getSubjectIdsByGroupId,
} = require('../controllers/listOfSubjectController');

// Получение всех листов 
router.get('/', async (request, response) => {
    try {
        const listofSub = await getlistOfSubject();
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при получении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при получении listOfSubject' });
    }
});

// Получение листа по ID
router.get('/:id', async (request, response) => {
    try {
        const listofSub = await getlistOfSubjectById(Number(request.params.id));
        if (!listofSub) {
            return response.status(404).json({ message: 'Запись не найдена' });
        }
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при получении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при получении listOfSubject' });
    }
});

// Получение листов по group_id
router.get('/group/:group_id', async (request, response) => {
    try {
        const listofSub = await getlistOfSubjectByGroupId(Number(request.params.group_id));
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при получении listOfSubject по groupId:', error);
        response.status(500).json({ message: 'Ошибка при получении listOfSubject по groupId' });
    }
});

// Получение листов по subject_id и группе
router.get('/group/:group_id/subject/:subject_id', async (request, response) => {
    try {
        const groupId = Number(request.params.group_id);
        const subjectId = Number(request.params.subject_id);
        const listofSub = await getlistOfSubjectBySubGroupId(subjectId, groupId);
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при получении listOfSubject по group_id и subject_id:', error);
        response.status(500).json({ message: 'Ошибка при получении listOfSubject по group_id и subject_id' });
    }
});
// Удаление листов по subject_id и группе и номеру семестра
router.delete('/group/:group_id/subject/:subject_id/semester_number/:semester_number', async (request, response) => {
    try {
        const groupId = Number(request.params.group_id);
        const subjectId = Number(request.params.subject_id);
        const semester_number = Number(request.params.semester_number);
        const listofSub = await deleteListOfSubjectByGroupIdSubjectIdAndSemester(subjectId, groupId,semester_number);
        response.status(204).send(); // Успешное удаление, но без контента
    } catch (error) {
        console.error('Ошибка при удалении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при удалении listOfSubject' });
    }
});

// Проверка существования записи
router.post('/isexist', async (request, response) => {
    const { subject_id, group_id, semester_number } = request.body;

    try {
        const exists = await checkListOfSubjectExists(subject_id, group_id, semester_number);
        
        if (exists) {
            return response.status(200).json( exists );
        }

        return response.status(404).json(false );
    } catch (error) {
        console.error('Ошибка при проверке существования listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при проверке существования listOfSubject' });
    }
});


// Создание новой записи
router.post('/', async (request, response) => {
    const { subject_id, group_id, semester_number } = request.body;

    try {
        const exists = await checkListOfSubjectExists(subject_id, group_id, semester_number);
        
        if (exists) {
            return response.status(400).json({ message: 'Запись с такими параметрами уже существует' });
        }

        const listofSub = await createLostOfSubject(subject_id, group_id, semester_number);
        response.status(201).json(listofSub);
    } catch (error) {
        console.error('Ошибка при создании listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при создании listOfSubject' });
    }
});

// Удаление записи по ID
router.delete("/:id", async (request, response) => {
    try {
        await deletelistofSubById(Number(request.params.id));
        response.status(204).send(); // Успешное удаление, но без контента
    } catch (error) {
        console.error('Ошибка при удалении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при удалении listOfSubject' });
    }
});

// Обновление записи по ID
router.put('/:id', async (request, response) => {
    const { subject_id, group_id, semester_number } = request.body;
    try {
        const listofSub = await updateListOfSub(Number(request.params.id), subject_id, group_id, semester_number);
        response.status(200).json(listofSub);
    } catch (error) {
        console.error('Ошибка при обновлении listOfSubject:', error);
        response.status(500).json({ message: 'Ошибка при обновлении listOfSubject' });
    }
});
// Получение всех subject_id по group_id
router.get('/subjectIds/:group_id', async (request, response) => {
    const groupId = Number(request.params.group_id);
    try {
        const subjectIds = await getSubjectIdsByGroupId(groupId);
        response.status(200).json(subjectIds);
    } catch (error) {
        console.error('Ошибка при получении subject_ids:', error);
        response.status(500).json({ message: 'Ошибка при получении subject_ids' });
    }
});



module.exports = router;
