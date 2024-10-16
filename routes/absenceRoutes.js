const express = require('express');
const router = express.Router();
const { getAbsences, getAbsencesById, deleteAbsencesById, createAbsence, updateAbsencesById } = require('../controllers/absenceController');
// Все пропуски
router.get('/', async (request, response) => {
    try {
        const absences = await getAbsences();
        response.status(200).json(absences);
    } catch (error) {
        console.error('Ошибка при получении пропусков:', error);
        response.status(500).json({ message: 'Ошибка при получении пропусков' });

    }


});
// Пропуски по ID
router.get("/:id", async (request, response) => {
    try {

        const absence = await getAbsencesById(Number(request.params.id));
        if (!absence) {
            return response.status(404).json({ message: 'Пропуск не найден' });
        }
        response.status(200).json(absence);
    } catch (error) {
        console.error('Ошибка при получении пропуска:', error);
        response.status(500).json({ message: 'Ошибка при получении пропуска' });

    }


})
// Создание пропусков
router.post('/', async (request, response) => {
    const { student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp } = request.body;
    try {
        const absence = await createAbsence(student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp);
        response.status(201).json(absence);
    } catch (error) {
        console.error('Ошибка при создани пропуска:', error);
        response.status(500).json({ message: 'Ошибка при создании пропуска' });

    }

});
// Обновление пропусков
router.put('/:id', async (request, response) => {
    const { student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp } = request.body;
    const absenceId = Number(request.params.id);
    try {
        const existingAbsence = await getAbsencesById(absenceId);
        if (!existingAbsence) {
            return response.status(404).json({ message: 'Лист пропусков не найден' });
        }
        const updateAbsences = await updateAbsencesById(absenceId, student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp);
        response.status(200).json(updateAbsences);

    } catch (error) {
        console.error('Ошибка при обновлении листа пропусков:', error);
        response.status(500).json({ message: 'Ошибка при обновлении листа пропусков' });
    }



});
// Удаление пропусков по id
router.delete('/:id', async (request, response) => {
    try {
        await deleteAbsencesById(Number(request.params.id));
        response.status(204).send();
    } catch (error) {
        console.error('Ошибка при удалении пропуска:', error);
        response.status(500).json({ message: 'Ошибка при удалении пропуска' });

    }

});



module.exports = router;