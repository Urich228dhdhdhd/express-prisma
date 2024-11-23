const express = require('express');
const router = express.Router();
const { getSubjects, getSubjectById, createSubject, deleteSubject, updateSubject } = require('../controllers/subjectController');
// Получение всех предметов
router.get('/', async (request, response) => {
    try {
        const subjects = await getSubjects();
        response.status(200).json(subjects);
    } catch (error) {
        console.error('Ошибка при получении предметов:', error);
        response.status(500).json({ message: 'Ошибка при получении предметов' });
    }
});
// Получить предмет по id
router.get('/:id', async (request, response) => {
    try {
        const subject = await getSubjectById(Number(request.params.id));
        response.status(200).json(subject);
    } catch (error) {
        console.error('Ошибка при получении предмета:', error);
        response.status(500).json({ message: 'Ошибка при получении предмета' });

    }

});
// Создание предмета
router.post('/', async (request, response) => {
    const { subject_name_short, subject_name_long } = request.body;
    try {
        const subject = await createSubject(subject_name_short, subject_name_long)
        response.status(201).json(subject);

    } catch (error) {
        if (error.code === 'P2002') {
            return response.status(400).json({
                message: 'Такой предмет уже существует.'
            });
        }

        response.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }

})
// Удаление предмета
router.delete('/:id', async (request, response) => {
    try {
        await deleteSubject(Number(request.params.id));
        response.status(201).send();

    } catch (error) {
        console.error('Ошибка при удалении предмета:', error);
        response.status(500).json({ message: 'Ошибка при удалении предмета' });

    }
});
// Обновление предмета
router.put("/:id", async (request, response) => {
    const { subject_name_short, subject_name_long } = request.body;
    const subjectId = Number(request.params.id);
    try {
        const subject = await updateSubject(subjectId, subject_name_short, subject_name_long);
        response.status(200).json(subject);


    } catch (error) {
        if (error.code === 'P2002') {
            return response.status(400).json({
                message: 'Такой предмет уже существует.'
            });
        }

        response.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
})



module.exports = router;
