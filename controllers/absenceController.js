const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAbsences = async () => {
    const absences = await prisma.absence.findMany({
    })
    return absences;
}
const getAbsencesById = async (id) => {
    const absences = await prisma.absence.findUnique({
        where: {
            id: id
        }
    })
    return absences;
}
const createAbsence = async (student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp) => {
    const absence = await prisma.absence.create({
        data: {
            student_id: student_id,
            year: year,
            month: month,
            absence_illness: absence_illness,
            absence_order: absence_order,
            absence_resp: absence_resp,
            absence_disresp: absence_disresp
        }
    })
    return absence;
}
const updateAbsencesById = async (id, student_id, year, month, absence_illness, absence_order, absence_resp, absence_disresp) => {
    const data = {};
    // Проверяем только на наличие значения
    if (student_id) {
        data.student_id = student_id;
    }
    if (year) {
        data.year = year;
    }
    if (month) {
        data.month = month;
    }
    if (absence_illness) {
        data.absence_illness = absence_illness;
    }
    if (absence_order) {
        data.absence_order = absence_order;
    }
    if (absence_resp) {
        data.absence_resp = absence_resp;
    }
    if (absence_disresp) {
        data.absence_disresp = absence_disresp;
    }
    const absence = await prisma.absence.update({
        where: {
            id: id
        },
        data: data
    });

    return absence;
};

const deleteAbsencesById = async (id) => {
    const absence = await prisma.absence.delete({
        where: {
            id: id
        }
    })
    return absence
}
const findAbsence = async (student_id, year, month) => {
    // Поиск записи пропусков по student_id, year и month
    const existingAbsence = await prisma.absence.findFirst({
        where: {
            student_id: student_id,
            year: year,
            month: month
        }
    });

    // Проверка, если запись найдена
    if (existingAbsence) {
        return existingAbsence;  // Возвращаем найденную запись
    }

};

const getAbsenceReport = async (selectedGroups, selectedMonth, selectedAbsenceTypes, selectedYear) => {
    try {
        // 1. Используем Prisma для получения пропусков с данными студентов
        const absences = await prisma.absence.findMany({
            where: {
                student: {
                    group_id: {
                        in: selectedGroups, // Фильтрация по выбранным группам
                    },
                },
                month: selectedMonth, // Фильтрация по выбранному месяцу
                year: selectedYear,  // Фильтрация по выбранному году
            },
            include: {
                student: true, // Включаем данные о студенте
            },
        });

        // // Логируем данные о пропусках для отладки
        // console.log('Данные о пропусках:', absences);

        // 2. Инициализируем пустой массив для отчета
        const report = selectedGroups.map(groupId => {
            // Инициализируем объект отчета для группы
            const absenceReport = {};

            if (selectedAbsenceTypes.includes('absenceIllness')) {
                absenceReport.illness = 0;
            }
            if (selectedAbsenceTypes.includes('absenceOrder')) {
                absenceReport.order = 0;
            }
            if (selectedAbsenceTypes.includes('absenceResp')) {
                absenceReport.resp = 0;
            }
            if (selectedAbsenceTypes.includes('absenceDisresp')) {
                absenceReport.disresp = 0;
            }

            return {
                group_id: groupId,
                absence_report: absenceReport,
            };
        });

        // 3. Обрабатываем данные о пропусках и заполняем отчет
        absences.forEach(absence => {
            // Проверяем наличие данных о студенте
            if (!absence.student) {
                console.error(`Отсутствует студент для пропуска с id: ${absence.id}`);
                return; // Пропускаем этот пропуск
            }

            // Найдем отчет для соответствующей группы
            const groupReport = report.find(r => r.group_id === absence.student.group_id);

            if (!groupReport) {
                console.error(`Группа с id: ${absence.student.group_id} не найдена`);
                return; // Пропускаем этот пропуск, если группа не найдена
            }

            // Включаем только те типы пропусков, которые были выбраны
            if (selectedAbsenceTypes.includes('absenceIllness')) {
                groupReport.absence_report.illness += absence.absence_illness || 0;
            }
            if (selectedAbsenceTypes.includes('absenceOrder')) {
                groupReport.absence_report.order += absence.absence_order || 0;
            }
            if (selectedAbsenceTypes.includes('absenceResp')) {
                groupReport.absence_report.resp += absence.absence_resp || 0;
            }
            if (selectedAbsenceTypes.includes('absenceDisresp')) {
                groupReport.absence_report.disresp += absence.absence_disresp || 0;
            }
        });

        // // Логируем итоговый отчет для отладки
        // console.log('Итоговый отчет:', report);

        // 4. Возвращаем итоговый отчет
        return report;
    } catch (error) {
        console.error('Ошибка при получении отчета:', error);
        throw new Error('Ошибка при получении отчета');
    }
};







module.exports = { getAbsences, getAbsencesById, deleteAbsencesById, createAbsence, updateAbsencesById, findAbsence, getAbsenceReport };
