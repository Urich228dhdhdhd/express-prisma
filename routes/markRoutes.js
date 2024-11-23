const express = require('express');
const router = express.Router();
const { getMarks, getMarkById, createMark, updateMark, deleteMarkById, getFilteredMarks } = require('../controllers/markController');
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
//Получение существующих оценок по группе, номеру семестра и предметы
router.get("/filter/group/:group_id/semester/:semester_number/subject/:subject_id/year/:semester_year", async (request, response) => {
    const { group_id, semester_number, subject_id, semester_year } = request.params;

    try {
        const marks = await getFilteredMarks(Number(group_id), Number(semester_number), Number(subject_id), Number(semester_year));
        response.status(200).json(marks);
    } catch (error) {
        console.error('Ошибка при получении оценок с фильтрацией:', error);
        response.status(500).json({ message: 'Ошибка при получении оценок с фильтрацией' });
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