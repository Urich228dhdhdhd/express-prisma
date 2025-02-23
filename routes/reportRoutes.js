const express = require('express');
const router = express.Router();
const { getPerformanceReport, getPerformancePercent, savePerformanceReport, saveAbsenceReport, getReportsByUserId, getReportById, getSummaryGroupAbsenceById, deleteReport } = require('../controllers/reportController');

// Создание отчета по успеваемости
router.post("/performance-report", async (request, response) => {
    const { group_id, semester_ids, subject_ids } = request.body;

    try {
        const report = await getPerformanceReport(group_id, semester_ids, subject_ids);
        response.status(200).json(report);
        // response.status(200).send();
    } catch (error) {
        console.error('Ошибка при получении оценок:', error);
        response.status(500).json({ message: 'Ошибка при получении оценокй' });
    }

});
// Получение только абсолютной успеваемости по группе
router.post("/performance-percent", async (request, response) => {
    const { group_id } = request.body;
    try {
        const report = await getPerformancePercent(group_id);
        response.status(200).json(report);

    } catch (error) {
        console.error('Ошибка при получении абсолютной успеваемости:', error);
        response.status(500).json({ message: 'Ошибка при получении абсолютной успеваемости' });
    }
});
// Сохранение отчета по успеваемости на сервере
router.post("/save-performance", async (request, response) => {
    const { type, user_id, report_data, selected_group, period, selected_subjects } = request.body;
    try {
        const report = await savePerformanceReport(type, user_id, report_data, selected_group, period, selected_subjects);
        response.status(200).json(report);

    } catch (error) {
        console.error('Ошибка при сохранении отчета:', error);
        response.status(500).json({ message: 'Ошибка при сохранении отчета' });
    }
});
// Сохранение отчета по пропускам на сервере
router.post("/save-absence", async (request, response) => {
    const { type, user_id, report_data, selected_groups, date, types_of_absence } = request.body;
    try {
        const report = await saveAbsenceReport(type, Number(user_id), report_data, selected_groups, date, types_of_absence);
        response.status(200).json(report);

    } catch (error) {
        console.error('Ошибка при сохранении отчета:', error);
        response.status(500).json({ message: 'Ошибка при сохранении отчета' });
    }
});
// ПОлучение всех отчетов пользователя
router.post("/reports", async (request, response) => {
    const { user_id } = request.body;
    try {
        const reports = await getReportsByUserId(Number(user_id));
        response.status(200).json(reports);

    } catch (error) {
        console.error('Ошибка при получении отчетов:', error);
        response.status(500).json({ message: 'Ошибка при получении отчетов' });
    }

})

// Получение данных отчета по id
router.get("/:id", async (request, response) => {
    const report_id = Number(request.params.id);
    try {
        const report = await getReportById(report_id);
        response.status(200).json(report);

    } catch (error) {
        console.error('Ошибка при получении отчета:', error);
        response.status(500).json({ message: 'Ошибка при получении отчета' });
    }
});
// Получения пропусков по группе
router.post("/group-absence", async (request, response) => {
    const { group_id } = request.body;
    try {
        const summary = await getSummaryGroupAbsenceById(Number(group_id));
        response.status(200).json(summary);


    } catch (error) {
        console.error('Ошибка при получении пропусков по группе:', error);
        response.status(500).json({ message: 'Ошибка при  получении пропусков по группе' });
    }
});
// Удаление отчета 
router.delete('/:id', async (request, response) => {
    try {
        await deleteReport(Number(request.params.id))
        response.status(200).send();
    } catch (error) {
        console.error('Ошибка при удалении отчета:', error);
        response.status(500).json({ message: 'Ошибка при удалении отчета' });
    }
});

module.exports = router;
