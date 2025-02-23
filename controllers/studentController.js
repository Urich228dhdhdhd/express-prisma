const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getStudents = async () => {
    const student = await prisma.student.findMany();
    return student;
}
const getStudentsById = async (id) => {
    const student = await prisma.student.findUnique({
        where: {
            id: id
        }
    });

    console.log(student);
    return student;
}
const getStudentsByIdAndRole = async (userId, userRole) => {
    console.log('userId:', userId, 'userRole:', userRole);
    let students;
    if (userRole == 'CURATOR') {
        students = await prisma.student.findMany({
            where: {
                group: {
                    status_group: "ACTIVE",
                    curator_id: userId,
                },
            },
            orderBy: {
                middle_name: "asc"
            },

        });
    } else if (userRole == 'ADMINISTRATOR') {
        students = await prisma.student.findMany({
            where: {
                group: {
                    status_group: "ACTIVE",

                }
            },
            orderBy: {
                middle_name: "asc"
            },
        });

    }
    return students;
};

const getStudentsByGroupId = async (group_id) => {
    // console.time('getStudentsByGroupId');
    // Начало измерения времени

    let students;
    students = await prisma.student.findMany({
        where: {
            group_id: group_id,
        },
        orderBy: {
            middle_name: 'asc', // Сортировка по фамилии в алфавитном порядке
        },
    });
    // console.timeEnd('getStudentsByGroupId');
    // Конец измерения времени

    return students;
}
const createStudent = async (first_name, middle_name, last_name, tel_number, date_birthday, group_id) => {
    const isStudentExist = await prisma.student.findUnique({
        where: {
            first_name_middle_name_last_name_tel_number: {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                tel_number: tel_number,
            },
        },
    });

    if (isStudentExist) {
        console.log("Исключение сработало");
        throw new Error("Такой студент уже существует");
    }

    const student = await prisma.student.create({
        data: {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            tel_number: tel_number,
            date_birthday: new Date(date_birthday),
            group_id: group_id,
        }
    });
    return student;
}


const updateStudent = async (id, first_name, middle_name, last_name, tel_number, date_birthday, group_id) => {

    const data = {};
    if (first_name) {
        data.first_name = first_name
    }
    if (middle_name) {
        data.middle_name = middle_name
    }
    if (last_name) {
        data.last_name = last_name
    }
    if (tel_number) {
        data.tel_number = tel_number
    }
    if (date_birthday) {
        data.date_birthday = date_birthday
    }
    if (group_id) {
        data.group_id = group_id
    }


    if (first_name || middle_name || last_name || tel_number) {
        const existingStudent = await prisma.student.findFirst({
            where: {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                tel_number: tel_number,
                NOT: { id: id },
            },
        });

        if (existingStudent) {
            console.log("Исключение сработало");
            throw new Error("Студент с такими данными уже существует");
        }
    }
    const student = await prisma.student.update({
        where: {
            id: id
        },
        data: data
    })

    console.log(student)
    return student;

}

const deleteStudent = async (id) => {
    const deleteStudent = await prisma.student.delete({
        where: {
            id: id
        }
    });
    return deleteStudent;
}



module.exports = { getStudents, getStudentsById, createStudent, deleteStudent, updateStudent, getStudentsByIdAndRole, getStudentsByGroupId };