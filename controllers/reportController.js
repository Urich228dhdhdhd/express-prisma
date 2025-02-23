const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs").promises;



const prisma = new PrismaClient();
const { getStudentsByGroupId } = require("../controllers/studentController")
const { getSemestersByIds, getSemestersByGroupId } = require("../controllers/semesterController")
const { getSubjectsByIds, getSubjects } = require("../controllers/subjectController")
const { getMarksByStudentIdSemesterIdsSubjectIds } = require("../controllers/markController");
const { group } = require("console");

const getPerformanceReport = async (group_id, semester_ids, subject_ids) => {
    console.log("Получены данные: группа", group_id);
    console.log("Получены данные: семестры", semester_ids);
    console.log("Получены данные: предметы", subject_ids);
    const students = await getStudentsByGroupId(group_id);
    students.sort();
    // console.log("students:", students);
    const semesters = await getSemestersByIds(semester_ids);
    // console.log("semesters:", semesters);
    const subjects = await getSubjectsByIds(subject_ids);
    // console.log("subjects:", subjects);

    let totalPassingMarks = 0;
    let totalPassingQualityMarks = 0;
    let totalMarksCount = 0;
    const passingMarks = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const weightForMarks = {
        "10": 100,
        "9": 100,
        "8": 64,
        "7": 64,
        "6": 36,
        "5": 36,
        "4": 16,
        "3": 16,
        "2": 16,
        "1": 16,
    };
    const totalMarksForGroup = {
        "10": 0, "9": 0, "8": 0, "7": 0, "6": 0, "5": 0,
        "4": 0, "3": 0, "2": 0, "1": 0,
    };


    const allMarks = await Promise.all(
        students.map(async (student) => {
            const marks = await getMarksByStudentIdSemesterIdsSubjectIds(
                student.id,
                semester_ids,
                subject_ids
            );
            const groupMarks = subjects.map((subject) => {
                const subjectMarks = marks.filter(mark => mark.subject_id == subject.id);
                const zachCounter = subjectMarks.filter(mark => mark.mark == "Зачет").length;
                // const nezachCounter = subjectMarks.filter(mark => mark.mark == "Незачет").length;

                const hasExamMark = subjectMarks.find((mark) => mark.is_exam)
                if (hasExamMark) {
                    const finalMark = subjectMarks.find((mark) => mark.is_exam).mark;
                    // ------
                    if (totalMarksForGroup[String(finalMark)] !== undefined) {
                        totalMarksForGroup[String(finalMark)]++;
                    }
                    if (passingMarks.includes(Number(finalMark))) {
                        totalMarksCount++;
                        if (finalMark >= 6) {
                            totalPassingMarks++;
                            if (finalMark >= 7) {
                                totalPassingQualityMarks++;
                            }
                        }
                    }
                    // ------
                    return {
                        subject: subject.subject_name_short,
                        marks: finalMark,
                        is_exam: true
                    };
                } else {

                    if (zachCounter === subjectMarks.length && zachCounter != 0) {
                        return {
                            subject: subject.subject_name_short,
                            marks: "Зачет",
                            is_exam: false
                        };
                    }
                    const totalMarks = subjectMarks.reduce((sum, marksOfSubject) => {
                        if (marksOfSubject.mark === "Незачет") {
                            return sum + 1;
                        }
                        if (marksOfSubject.mark != "Зачет") {
                            return sum + +marksOfSubject.mark;
                        }
                        return sum;

                    }, 0);

                    const averageMark = Math.round((totalMarks / (subjectMarks.length - zachCounter)).toFixed(2));
                    // -----
                    if (totalMarksForGroup[String(averageMark)] !== undefined) {
                        totalMarksForGroup[String(averageMark)]++;
                    }
                    if (passingMarks.includes(Number(averageMark))) {
                        totalMarksCount++;
                        if (averageMark >= 6) {
                            totalPassingMarks++;
                            if (averageMark >= 7) {
                                totalPassingQualityMarks++;
                            }
                        }
                    }

                    // -----

                    return {
                        subject: subject.subject_name_short,
                        marks: averageMark,
                        is_exam: false,

                    };
                }






            })



            return { student: `${student.middle_name} ${student.first_name[0]}.${student.last_name[0]}`, subjects: groupMarks }



        })


    )
    // console.log(`Общее количество оценок:${totalMarksCount}`);

    const performancePercent = totalPassingMarks / totalMarksCount * 100;
    const qualityOfKnowledgePercent = totalPassingQualityMarks / totalMarksCount * 100;
    let totalWeightedMarks = 0;
    totalWeightedMarks = Object.keys(totalMarksForGroup).reduce((sum, mark) => {
        return sum + totalMarksForGroup[mark] * weightForMarks[mark];
    }, 0);



    const studentsLearningPercent = (totalWeightedMarks / totalMarksCount)
        // / 100
        ;



    return {
        allMarks,
        performancePercent: performancePercent.toFixed(2),
        qualityOfKnowledgePercent: qualityOfKnowledgePercent.toFixed(2),
        studentsLearningPercent: studentsLearningPercent.toFixed(2),
    };

}
const getPerformancePercent = async (group_id) => {
    const students = await getStudentsByGroupId(group_id);
    const subjects = await getSubjects();
    const semesters = await getSemestersByGroupId(group_id);

    // console.log("students:", students);
    // console.log("semesters:", semesters);
    // console.log("subjects:", subjects);

    let totalPassingMarks = 0;
    let totalMarksCount = 0;

    const allMarks = await Promise.all(
        students.map(async (student) => {
            const marks = await getMarksByStudentIdSemesterIdsSubjectIds(
                student.id,
                semesters.map(semester => semester.id),
                subjects.map(subject => subject.id)
            );

            const groupMarks = subjects.map((subject) => {
                const subjectMarks = marks.filter(mark => mark.subject_id == subject.id);
                if (subjectMarks.length === 0) {
                    // Если по предмету вообще нет оценок
                    return {
                        subject: subject.subject_name_short,
                        marks: null,
                        is_exam: false
                    };
                }
                const zachCounter = subjectMarks.filter(mark => mark.mark == "Зачет").length;
                // const nezachCounter = subjectMarks.filter(mark => mark.mark == "Незачет").length;

                const hasExamMark = subjectMarks.find((mark) => mark.is_exam)
                if (hasExamMark) {
                    const finalMark = subjectMarks.find((mark) => mark.is_exam).mark;
                    // ------

                    totalMarksCount++;
                    if (finalMark >= 6) {
                        totalPassingMarks++;

                    }


                    // ------
                    return {
                        subject: subject.subject_name_short,
                        marks: finalMark,
                        is_exam: true
                    };
                } else {

                    if (zachCounter === subjectMarks.length && zachCounter != 0) {
                        return {
                            subject: subject.subject_name_short,
                            marks: "Зачет",
                            is_exam: false
                        };
                    }
                    const totalMarks = subjectMarks.reduce((sum, marksOfSubject) => {
                        if (marksOfSubject.mark === "Незачет") {
                            return sum + 1;
                        }
                        if (marksOfSubject.mark != "Зачет") {
                            return sum + +marksOfSubject.mark;
                        }
                        return sum;

                    }, 0);

                    const averageMark = Math.round(totalMarks / (subjectMarks.length - zachCounter));


                    // -----

                    totalMarksCount++;
                    if (averageMark >= 6) {
                        totalPassingMarks++;

                    }


                    // -----
                    return {
                        subject: subject.subject_name_short,
                        marks: averageMark,
                        is_exam: false,

                    };
                }






            });

            return {
                student: student.first_name,
                subjects: groupMarks
            };
        })
    );

    const performancePercent = (totalPassingMarks / totalMarksCount) * 100;


    return {
        performancePercent: performancePercent.toFixed(2),
        // allMarks
    };
};

const savePerformanceReport = async (type, user_id, report_data, selected_group, period, selected_subjects) => {
    try {
        const reportDir = path.join("reports");
        if (!fs.access(reportDir)) {
            fs.mkdir(reportDir, { recursive: true });
        }
        const fileName = `Отчет_${user_id}_${Date.now()}`;
        const filePath = path.join(reportDir, fileName);
        const reportContent = {
            type,
            report_data,
            selected_group,
            period,
            selected_subjects
        }
        fs.writeFile(filePath, JSON.stringify(reportContent, null, 2));
        const report = await prisma.performanceReport.create({
            data: {
                user_id: user_id,
                reportName: fileName,
                filePath: filePath,
            }
        })
        return report


    } catch (error) {
        throw error;
    }

};
const saveAbsenceReport = async (type, user_id, report_data, selected_groups, date, types_of_absence) => {
    try {
        const reportDir = path.join("reports");
        if (!fs.access(reportDir)) {
            fs.mkdir(reportDir, { recursive: true });
        }
        const fileName = `Отчет_${user_id}_${Date.now()}`;
        const filePath = path.join(reportDir, fileName);
        const reportContent = {
            type,
            report_data,
            selected_groups,
            date,
            types_of_absence
        }
        fs.writeFile(filePath, JSON.stringify(reportContent, null, 2));
        const report = await prisma.performanceReport.create({
            data: {
                user_id: user_id,
                reportName: fileName,
                filePath: filePath,

            }
        })


        return report


    } catch (error) {
        throw error;
    }

};
const deleteReport = async (report_id) => {
    const report = await prisma.performanceReport.findUnique({
        where: { id: report_id },
    });

    await fs.unlink(report.filePath)

    await prisma.performanceReport.delete({
        where: {
            id: report.id
        }
    });

}

const getReportsByUserId = async (user_id) => {
    const reports = await prisma.performanceReport.findMany({
        where: {
            user_id: user_id,
        },
        orderBy: { created_at: "desc" }
    });
    return reports
}


const getReportById = async (report_id) => {
    const report = await prisma.performanceReport.findUnique({
        where: {
            id: report_id
        },
    });
    const normalizedPath = report.filePath.replace(/\\/g, "/");


    try {
        await fs.access(normalizedPath);
    } catch (error) {
        console.error("Ошибка при доступе к файлу:", error.message);
        throw new Error("Файл отчета не найден");
    }


    const fileData = await fs.readFile(`${normalizedPath}`, 'utf8');
    const jsonObject = JSON.parse(fileData);
    return jsonObject



}
const getSummaryGroupAbsenceById = async (group_id) => {


    const summary = await prisma.absence.aggregate({

        where: {
            student: {
                group_id: group_id
            },
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,

        },
        _sum: {
            absence_illness: true,
            absence_order: true,
            absence_resp: true,
            absence_disresp: true,
        }

    });
    const fixNullValues = (obj) => ({
        absence_illness: obj.absence_illness ?? 0,
        absence_order: obj.absence_order ?? 0,
        absence_resp: obj.absence_resp ?? 0,
        absence_disresp: obj.absence_disresp ?? 0,
    });
    return fixNullValues(summary._sum);

}







module.exports = { getPerformanceReport, getPerformancePercent, savePerformanceReport, saveAbsenceReport, getReportsByUserId, getReportById, getSummaryGroupAbsenceById, deleteReport };