const express = require('express');
const router = express.Router();
const { getMarks, getMarkById, createMark, updateMark, deleteMarkById } = require('../controllers/markController');
const { route } = require('./userRoutes');
// Все оценки
router.get("/", async (request, response) => {
    try {
        const markArj = await getMarks();
        response.status(200).json(markArj);
    } catch (error) {
        console.error('Ошибка при получении оценок:', error);
        response.status(500).json({ message: 'Ошибка при получении оценокй' });
    }

});
// Получить оценку по id
router.get("/:id", async (request, response) => {
    try {
        const markArj = await getMarkById(Number(request.params.id));
        if (!markArj) {
            return response.status(404).json({ message: 'Оценка не найдена' });
        }
        response.status(200).json(markArj);
    } catch (error) {
        console.error('Ошибка при получении оценки:', error);
        response.status(404).json({ message: 'Оценка не найдена' });
    }
});
// Создание оценки
router.post("/", async (request, response) => {
    const { student_id, semester_id, subject_id, mark } = request.body;
    try {
        const markarj = await createMark(student_id, semester_id, subject_id, mark);
        response.status(201).json(markarj)
    } catch (error) {
        console.error('Ошибка при создании оценки:', error);
        response.status(500).json({ message: 'Ошибка при создании оценки' });
    }
});

// Изменение оценки
router.put('/:id', async (request, response) => {
    const { student_id, semester_id, subject_id, mark } = request.body;
    const markId = Number(request.params.id);
    try {
        const existingMark = await getMarkById(markId);
        if (!existingMark) {
            return response.status(404).json({ message: 'Оценка не найдена' });
        }
        const markArj = await updateMark(markId, student_id, semester_id, subject_id, mark);
        response.status(200).json(markArj);
    } catch (error) {
        console.error('Ошибка при обновлении оценки:', error);
        response.status(500).json({ message: 'Ошибка при обновлении оценки' });
    }

});


// Удаление оценки
router.delete("/:id", async (request, response) => {
    try {
        await deleteMarkById(Number(request.params.id));
        response.status(204).send();
    } catch (error) {
        console.error('Ошибка при удалении оценки:', error);
        response.status(404).json({ message: 'Оценка не найдена' });

    }
});




module.exports = router;