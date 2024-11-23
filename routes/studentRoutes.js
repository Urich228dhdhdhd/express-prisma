const express = require('express');
const router = express.Router();
const { getStudents, getStudentsById, createStudent, deleteStudent, updateStudent, getStudentsByIdAndRole, getStudentsByGroupId } = require('../controllers/studentController');

// Получение всех студентов
router.get('/', async (request, response) => {
    try {
        const student = await getStudents();
        response.status(200).json(student);

    } catch (error) {
        console.error('Ошибка при получении студентов:', error);
        response.status(500).json({ message: 'Ошибка при получении студентов' });
    }

});
router.get('/:id', async (request, response) => {
    try {
        const student = await getStudentsById(Number(request.params.id));
        if (!student) {
            return response.status(404).json({ message: 'Студент не найден' });
        }
        response.status(200).json(student);

    } catch (error) {
        console.error('Ошибка при получении студентов:', error);
        response.status(500).json({ message: 'Ошибка при получении студентов' });
    }

});
// Создание студента
router.post('/', async (request, response) => {
    const { first_name, middle_name, last_name, tel_number, date_birthday, group_id } = request.body;
    try {
        const student = await createStudent(first_name, middle_name, last_name, tel_number, date_birthday, group_id);
        response.status(200).json(student);

    } catch (error) {
        if (error.code === 'P2002') {
            return response.status(400).json({
                message: 'Такой студент уже существует.'
            });
        }
        console.error('Ошибка при создании студента:', error);
        response.status(500).json({ message: 'Ошибка при создании студента' });


    }
});

// Обновление студента
router.put('/:id', async (request, response) => {
    const { first_name, middle_name, last_name, tel_number, date_birthday, group_id } = request.body;
    const studentId = Number(request.params.id);

    try {
        const student = await updateStudent(studentId, first_name, middle_name, last_name, tel_number, date_birthday, group_id);
        response.status(200).json(student);
    } catch (error) {
        console.error('Ошибка при обновлении студента:', error);
        response.status(500).json({ message: 'Ошибка при обновлении студента' });
    }
});

// Удаление чтудента 
router.delete('/:id', async (request, response) => {
    try {
        await deleteStudent(Number(request.params.id))
        response.status(200).send();
    } catch (error) {
        console.error('Ошибка при удалении студента:', error);
        response.status(500).json({ message: 'Ошибка при удалении студента' });
    }
});
// Получение студентов по куратору или администратору
// Получение студентов в зависимости от роли
router.post('/get/by-role', async (request, response) => {
    const { userId, userRole } = request.body;

    try {
        const students = await getStudentsByIdAndRole(Number(userId), userRole);
        response.status(200).json(students);
    } catch (error) {
        console.error('Ошибка при получении студентов:', error);
        response.status(500).json({ message: 'Ошибка при получении студентов' });
    }
});
router.get('/get/by-group/:groupid', async (request, response) => {
    try {
        const students = await getStudentsByGroupId(Number(request.params.groupid));
        response.status(200).json(students);
    } catch (error) {
        console.error('Ошибка при получении студентов:', error);
        response.status(500).json({ message: 'Ошибка при получении студентов' });
    }
});



module.exports = router;
