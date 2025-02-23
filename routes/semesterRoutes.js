const express = require('express');
const router = express.Router();
const { getSemesters, getSemesterById, createSemester, deleteSemesterById, updateSemesterById, getSemesterByNumberAndYear } = require('../controllers/semesterController');
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

// Проверка существования семестра по полному номеру и году
router.get('/check/:semester_number/:semester_year', async (request, response) => {
    const { semester_number, semester_year } = request.params;
    try {
        const semester = await getSemesterByNumberAndYear(Number(semester_number), Number(semester_year));
        if (semester) {
            return response.status(200).json({ exists: true }); // Семестр существует
        } else {
            return response.status(200).json({ exists: false }); // Семестр не существует
        }
    } catch (error) {
        console.error('Ошибка при проверке существования семестра:', error);
        response.status(500).json({ message: 'Ошибка при проверке существования семестра' });
    }
});

router.get("/getsemester/:semester_number/:semester_year", async (request, response) => {
    const { semester_number, semester_year } = request.params;
    try {
        const semester = await getSemesterByNumberAndYear(Number(semester_number), Number(semester_year));
        if (semester) {
            return response.status(200).json(semester); // Семестр существует
        } else {
            // return response.status(200).json(false)
        }
    } catch (error) {
        console.error('Ошибка при получении семестра по semester_number и semester_year', error);
        response.status(500).json({ message: 'Ошибка при получении семестра по semester_number и semester_year' });
    }
});



// Создание семестра
router.post("/", async (request, response) => {
    const { semester_number, semester_year, semester_part } = request.body; // Обновлено для включения semester_part
    try {
        const semester = await createSemester(semester_number, semester_year, semester_part);
        response.status(201).json(semester);
    } catch (error) {
        console.error('Ошибка при создании семестра:', error);
        response.status(500).json({ message: 'Ошибка при создании семестра' });
    }
});

// Обновление семестра
router.put("/:id", async (request, response) => {
    const { semester_number, semester_year, semester_part } = request.body; // Обновлено для включения semester_part
    const semesterId = Number(request.params.id);
    try {
        const existingSemester = await getSemesterById(semesterId);
        if (!existingSemester) {
            return response.status(404).json({ message: 'Семестр не найден' });
        }

        const updSemester = await updateSemesterById(semesterId, semester_number, semester_year, semester_part);
        response.status(200).json(updSemester);
    } catch (error) {
        console.error('Ошибка при обновлении семестра:', error);
        response.status(500).json({ message: 'Ошибка при обновлении семестра' });
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
