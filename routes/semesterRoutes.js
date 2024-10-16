const express = require('express');
const router = express.Router();
const { getSemesters, getSemesterById, createSemester, deleteSemesterById, updateSemesterById } = require('../controllers/semesterController');
// Все семестры
router.get('/', async (request, response) => {
    try {
        const semester = await getSemesters();
        response.status(200).json(semester);
    } catch (error) {
        console.error('Ошибка при получении семестров:', error);
        response.status(500).json({ message: 'Ошибка при получении семестров' });
    }
});

// Семестр по id
router.get('/:id', async (request, response) => {
    try {
        const semester = await getSemesterById(Number(request.params.id));
        if (!semester) {
            return response.status(404).json({ message: 'Семестр не найден' });
        }
        response.status(200).json(semester);
    } catch (error) {
        console.error('Ошибка при получении семестрa:', error);
        response.status(500).json({ message: 'Ошибка при получении семестрa' });
    }
});



// Создание семестра
router.post("/", async (request, response) => {
    const { semester_number, semester_year } = request.body;
    try {
        const semester = await createSemester(semester_number, semester_year);
        response.status(201).json(semester);
    } catch (error) {
        console.error('Ошибка при создании семестра:', error);
        response.status(500).json({ message: 'Ошибка при создании семестра' });
    }
});


// Обнавление семестра
router.put("/:id", async (request, response) => {
    const { semester_number, semester_year } = request.body;
    const semesterId = Number(request.params.id);
    try {
        const existingSemester = await getSemesterById(semesterId);
        if (!existingSemester) {
            return response.status(404).json({ message: 'Семестер не найден' });
        }

        const updSemester = await updateSemesterById(semesterId, semester_number, semester_year);
        response.status(200).json(updSemester);
    } catch (error) {
        console.error('Ошибка при обнавлении семестра:', error);
        response.status(500).json({ message: 'Ошибка при обнавлении семестра' });
    }



});


// Удаление семестра
router.delete("/:id", async (request, response) => {
    try {
        await deleteSemesterById(Number(request.params.id));
        response.status(204).send(); // Успешное удаление, но без контента
    } catch (error) {
        console.error('Ошибка при удалении семестра:', error);
        response.status(404).json({ message: 'Ошибка при удалении семестра' });
    }

});


module.exports = router;
