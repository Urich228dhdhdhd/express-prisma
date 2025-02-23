const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createUser } = require('../controllers/userController');
const { createAbsence } = require('../controllers/absenceController');

const usersList = [
    { username: 'ivan_ivanov', password: 'password1', role: 'CURATOR', first_name: 'Иван', middle_name: 'Иванович', last_name: 'Иванов' },
    { username: 'maria_petrov', password: 'password2', role: 'CURATOR', first_name: 'Мария', middle_name: 'Александровна', last_name: 'Петрова' },
    { username: 'petr_sidorov', password: 'password3', role: 'CURATOR', first_name: 'Петр', middle_name: 'Сергеевич', last_name: 'Сидоров' },
    { username: 'olga_kuznetsova', password: 'password4', role: 'CURATOR', first_name: 'Ольга', middle_name: 'Александровна', last_name: 'Кузнецова' },
    { username: 'alexey_smirnov', password: 'password5', role: 'CURATOR', first_name: 'Алексей', middle_name: 'Петрович', last_name: 'Смирнов' },
    { username: 'irina_morozova', password: 'password6', role: 'CURATOR', first_name: 'Ирина', middle_name: 'Васильевна', last_name: 'Морозова' },
    { username: 'dmitry_komarov', password: 'password7', role: 'CURATOR', first_name: 'Дмитрий', middle_name: 'Игоревич', last_name: 'Комаров' },
    { username: 'evgenia_larionova', password: 'password8', role: 'CURATOR', first_name: 'Евгения', middle_name: 'Геннадьевна', last_name: 'Ларионова' },
    { username: 'sergey_vasilyev', password: 'password9', role: 'CURATOR', first_name: 'Сергей', middle_name: 'Викторович', last_name: 'Васильев' },
    { username: 'natalia_belyaeva', password: 'password10', role: 'CURATOR', first_name: 'Наталия', middle_name: 'Анатольевна', last_name: 'Беляева' }
];

const subjectList = [
    // =====================================
    { subject_name_short: "Бел. яз.", subject_name_long: "Белорусский язык" },
    { subject_name_short: "Бел. лит.", subject_name_long: "Белорусская литература" },
    { subject_name_short: "ФКиЗ", subject_name_long: "Физическая культура и здоровье" },
    { subject_name_short: "Математика", subject_name_long: "Математика" },
    { subject_name_short: "Рус. яз.", subject_name_long: "Русский язык" },
    { subject_name_short: "Рус. лит.", subject_name_long: "Русская литература" },
    { subject_name_short: "Ин. яз.", subject_name_long: "Иностранный язык" },
    // ========================================
    { subject_name_short: "Всемирная история", subject_name_long: "Всемирная история" },
    { subject_name_short: "История Беларуси", subject_name_long: "История Беларуси" },
    { subject_name_short: "Обществоведение", subject_name_long: "Обществоведение" },
    { subject_name_short: "Информатика", subject_name_long: "Информатика" },
    { subject_name_short: "Физика", subject_name_long: "Физика" },
    { subject_name_short: "Астрономия", subject_name_long: "Астрономия" },
    { subject_name_short: "Химия", subject_name_long: "Химия" },
    { subject_name_short: "Биология", subject_name_long: "Биология" },
    { subject_name_short: "География", subject_name_long: "География" },
    { subject_name_short: "Черчение", subject_name_long: "Черчение" },
    { subject_name_short: "Мед Под", subject_name_long: "Допризывная медицинская подготовка" },
    { subject_name_short: "ДП", subject_name_long: "Допризывная подготовка" },
    { subject_name_short: "ЗНТЧС", subject_name_long: "Защита населения и территорий от чрезвычайных ситуаций" },
    { subject_name_short: "Основы права", subject_name_long: "Основы права" },
    { subject_name_short: "ОСГН", subject_name_long: "Основы социально-гуманитарных наук" },
    { subject_name_short: "Инж графика", subject_name_long: "Инженерная компьютерная графика" },
    { subject_name_short: "Электронные компоненты", subject_name_long: "Электрические и электронные компоненты устройств и систем" },
    // ----------------------------------------------
    { subject_name_short: "ОСА", subject_name_long: "Основы алгоритмизации и программирования" },
    { subject_name_short: "Стандартизация", subject_name_long: "Стандартизация и сертификация" },
    { subject_name_short: "Защита КИ", subject_name_long: "Защита информации" },
    { subject_name_short: "Моб. вычисл. системы", subject_name_long: "Мобильные вычислительные системы" },
    { subject_name_short: "ОТ", subject_name_long: "Охрана труда" },
    { subject_name_short: "Экономика организации", subject_name_long: "Экономика организации" },
    { subject_name_short: "ИнЯз Проф", subject_name_long: "Иностранный язык (профессиональная лексика)" },
    { subject_name_short: "Структуры и БД", subject_name_long: "Структуры и базы данных" },
    // ----------------------------
    { subject_name_short: "Программирование МК", subject_name_long: "Программирование микроконтроллеров для мобильных систем" },
    { subject_name_short: "ОКиТПЭВС", subject_name_long: "Основы конструирования и технология производства электронных вычислительных средств" },
    { subject_name_short: "РПМУ", subject_name_long: "Разработка приложений для мобильных устройств" },
    { subject_name_short: "Математ. моделирование", subject_name_long: "Математическое моделирование" },
    { subject_name_short: "ВПМУ", subject_name_long: "Веб-программирование для мобильных устройств" },
    { subject_name_short: "ООСИЗ", subject_name_long: "Охрана окружающей среды и энергосбережение" },
    { subject_name_short: "Бел яз. Проф", subject_name_long: "Белорусский язык (профессиональная лексика)" },
    { subject_name_short: "Компьютерные сети", subject_name_long: "Компьютерные сети" },
    { subject_name_short: "Основы менеджмента", subject_name_long: "Основы менеджмента" },
    { subject_name_short: "ПДД", subject_name_long: "Правила дорожного движения" },
    { subject_name_short: "Коррупция", subject_name_long: "Коррупция, её общественная опасность" },
    { subject_name_short: "Основы идеологии", subject_name_long: "Основы идеологии белорусского государства" },
    { subject_name_short: "Основы семейной жизни", subject_name_long: "Основы семейной жизни" },
];


const geroup1StudList = [
    {
        "id": 1,
        "first_name": "Александр",
        "middle_name": "Алексеенко",
        "last_name": "Иванович",
        "tel_number": "+375299096863",
        "date_birthday": "2024-12-02T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 2,
        "first_name": "Анатолий",
        "middle_name": "Андриевич",
        "last_name": "Петрович",
        "tel_number": "+375299096864",
        "date_birthday": "2024-11-02T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 3,
        "first_name": "Игорь",
        "middle_name": "Башмаков",
        "last_name": "Александрович",
        "tel_number": "+375299096865",
        "date_birthday": "2024-10-03T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 4,
        "first_name": "Анна",
        "middle_name": "Василькова",
        "last_name": "Сергеевна",
        "tel_number": "+375299096866",
        "date_birthday": "2024-09-04T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 5,
        "first_name": "Екатерина",
        "middle_name": "Вежновец",
        "last_name": "Дмитриевна",
        "tel_number": "+375299096867",
        "date_birthday": "2024-08-05T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 6,
        "first_name": "Алексей",
        "middle_name": "Велько",
        "last_name": "Николаевич",
        "tel_number": "+375299096868",
        "date_birthday": "2024-07-06T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 7,
        "first_name": "Максим",
        "middle_name": "Войтешонок",
        "last_name": "Владимирович",
        "tel_number": "+375299096869",
        "date_birthday": "2024-06-07T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 8,
        "first_name": "Константин",
        "middle_name": "Волосюк",
        "last_name": "Евгеньевич",
        "tel_number": "+375299096870",
        "date_birthday": "2024-05-08T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 9,
        "first_name": "Андрей",
        "middle_name": "Дроник",
        "last_name": "Борисович",
        "tel_number": "+375299096871",
        "date_birthday": "2024-04-09T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 10,
        "first_name": "Петр",
        "middle_name": "Ероховец",
        "last_name": "Геннадьевич",
        "tel_number": "+375299096872",
        "date_birthday": "2024-03-10T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 11,
        "first_name": "Михаил",
        "middle_name": "Казак",
        "last_name": "Олегович",
        "tel_number": "+375299096873",
        "date_birthday": "2024-02-11T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 12,
        "first_name": "Дмитрий",
        "middle_name": "Карачун",
        "last_name": "Григорьевич",
        "tel_number": "+375299096874",
        "date_birthday": "2024-01-12T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 13,
        "first_name": "Николай",
        "middle_name": "Кашталян",
        "last_name": "Романович",
        "tel_number": "+375299096875",
        "date_birthday": "2023-12-13T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 14,
        "first_name": "Ирина",
        "middle_name": "Келбас",
        "last_name": "Юрьевна",
        "tel_number": "+375299096876",
        "date_birthday": "2023-11-14T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 15,
        "first_name": "Ксения",
        "middle_name": "Маркина",
        "last_name": "Анатольевна",
        "tel_number": "+375299096877",
        "date_birthday": "2023-10-15T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 16,
        "first_name": "Ярослав",
        "middle_name": "Мартьянов",
        "last_name": "Вячеславович",
        "tel_number": "+375299096878",
        "date_birthday": "2023-09-16T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 17,
        "first_name": "Артем",
        "middle_name": "Матукевич",
        "last_name": "Степанович",
        "tel_number": "+375299096879",
        "date_birthday": "2023-08-17T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 18,
        "first_name": "Тимур",
        "middle_name": "Матусевич",
        "last_name": "Константинович",
        "tel_number": "+375299096880",
        "date_birthday": "2023-07-18T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 19,
        "first_name": "Данил",
        "middle_name": "Мурашко",
        "last_name": "Алексеевич",
        "tel_number": "+375299096881",
        "date_birthday": "2023-06-19T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 20,
        "first_name": "Елена",
        "middle_name": "Муха",
        "last_name": "Васильевна",
        "tel_number": "+375299096882",
        "date_birthday": "2023-05-20T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 21,
        "first_name": "София",
        "middle_name": "Овсяник",
        "last_name": "Федоровна",
        "tel_number": "+375299096883",
        "date_birthday": "2023-04-21T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 22,
        "first_name": "Павел",
        "middle_name": "Рогов",
        "last_name": "Семенович",
        "tel_number": "+375299096884",
        "date_birthday": "2023-03-22T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 23,
        "first_name": "Никита",
        "middle_name": "Русак",
        "last_name": "Леонидович",
        "tel_number": "+375299096885",
        "date_birthday": "2023-02-23T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 24,
        "first_name": "Виктор",
        "middle_name": "Сермяжко",
        "last_name": "Павлович",
        "tel_number": "+375299096886",
        "date_birthday": "2023-01-24T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 25,
        "first_name": "Вячеслав",
        "middle_name": "Уселёнок",
        "last_name": "Эдуардович",
        "tel_number": "+375299096887",
        "date_birthday": "2022-12-25T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 26,
        "first_name": "Анна",
        "middle_name": "Чалайдюк",
        "last_name": "Тимофеевна",
        "tel_number": "+375299096888",
        "date_birthday": "2022-11-26T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 27,
        "first_name": "Денис",
        "middle_name": "Шапоткин",
        "last_name": "Валерьевич",
        "tel_number": "+375299096889",
        "date_birthday": "2022-10-27T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 28,
        "first_name": "Сергей",
        "middle_name": "Явнюк",
        "last_name": "Олегович",
        "tel_number": "+375299096890",
        "date_birthday": "2022-09-28T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 29,
        "first_name": "Владимир",
        "middle_name": "Янукович",
        "last_name": "Георгиевич",
        "tel_number": "+375299096891",
        "date_birthday": "2022-08-29T00:00:00.000Z",
        "group_id": 1
    }
];
const group2StudList = [
    {
        "id": 1,
        "first_name": "Алексей",
        "middle_name": "Смирнов",
        "last_name": "Дмитриевич",
        "tel_number": "+375291234567",
        "date_birthday": "2000-05-12T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 2,
        "first_name": "Екатерина",
        "middle_name": "Козлова",
        "last_name": "Андреевна",
        "tel_number": "+375292345678",
        "date_birthday": "2001-07-23T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 3,
        "first_name": "Дмитрий",
        "middle_name": "Новиков",
        "last_name": "Сергеевич",
        "tel_number": "+375293456789",
        "date_birthday": "1999-11-30T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 4,
        "first_name": "Ольга",
        "middle_name": "Морозова",
        "last_name": "Игоревна",
        "tel_number": "+375294567890",
        "date_birthday": "2002-03-14T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 5,
        "first_name": "Игорь",
        "middle_name": "Павлов",
        "last_name": "Викторович",
        "tel_number": "+375295678901",
        "date_birthday": "2000-09-09T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 6,
        "first_name": "Анна",
        "middle_name": "Волкова",
        "last_name": "Александровна",
        "tel_number": "+375296789012",
        "date_birthday": "2001-12-25T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 7,
        "first_name": "Сергей",
        "middle_name": "Соловьев",
        "last_name": "Николаевич",
        "tel_number": "+375297890123",
        "date_birthday": "1998-08-17T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 8,
        "first_name": "Татьяна",
        "middle_name": "Васильева",
        "last_name": "Павловна",
        "tel_number": "+375298901234",
        "date_birthday": "2003-02-28T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 9,
        "first_name": "Андрей",
        "middle_name": "Зайцев",
        "last_name": "Олегович",
        "tel_number": "+375299012345",
        "date_birthday": "2000-06-19T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 10,
        "first_name": "Наталья",
        "middle_name": "Павлова",
        "last_name": "Денисовна",
        "tel_number": "+375291123456",
        "date_birthday": "2001-04-07T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 11,
        "first_name": "Павел",
        "middle_name": "Семенов",
        "last_name": "Анатольевич",
        "tel_number": "+375292234567",
        "date_birthday": "1999-10-11T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 12,
        "first_name": "Юлия",
        "middle_name": "Голубева",
        "last_name": "Валерьевна",
        "tel_number": "+375293345678",
        "date_birthday": "2002-01-22T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 13,
        "first_name": "Виктор",
        "middle_name": "Виноградов",
        "last_name": "Игоревич",
        "tel_number": "+375294456789",
        "date_birthday": "2000-07-03T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 14,
        "first_name": "Елена",
        "middle_name": "Белова",
        "last_name": "Сергеевна",
        "tel_number": "+375295567890",
        "date_birthday": "2001-09-15T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 15,
        "first_name": "Артем",
        "middle_name": "Крылов",
        "last_name": "Денисович",
        "tel_number": "+375296678901",
        "date_birthday": "1999-03-27T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 16,
        "first_name": "Марина",
        "middle_name": "Максимова",
        "last_name": "Алексеевна",
        "tel_number": "+375297789012",
        "date_birthday": "2002-05-08T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 17,
        "first_name": "Никита",
        "middle_name": "Орлов",
        "last_name": "Владимирович",
        "tel_number": "+375298890123",
        "date_birthday": "2000-12-31T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 18,
        "first_name": "Кристина",
        "middle_name": "Андреева",
        "last_name": "Ивановна",
        "tel_number": "+375299901234",
        "date_birthday": "2001-02-14T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 19,
        "first_name": "Роман",
        "middle_name": "Медведев",
        "last_name": "Андреевич",
        "tel_number": "+375291012345",
        "date_birthday": "1998-06-09T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 20,
        "first_name": "Алина",
        "middle_name": "Ершова",
        "last_name": "Викторовна",
        "tel_number": "+375292123456",
        "date_birthday": "2003-08-20T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 21,
        "first_name": "Владислав",
        "middle_name": "Тихонов",
        "last_name": "Степанович",
        "tel_number": "+375293234567",
        "date_birthday": "2000-04-05T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 22,
        "first_name": "Людмила",
        "middle_name": "Федорова",
        "last_name": "Анатольевна",
        "tel_number": "+375294345678",
        "date_birthday": "2001-10-18T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 23,
        "first_name": "Георгий",
        "middle_name": "Данилов",
        "last_name": "Романович",
        "tel_number": "+375295456789",
        "date_birthday": "1999-01-29T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 24,
        "first_name": "Валерия",
        "middle_name": "Жукова",
        "last_name": "Дмитриевна",
        "tel_number": "+375296567890",
        "date_birthday": "2002-07-12T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 25,
        "first_name": "Станислав",
        "middle_name": "Савельев",
        "last_name": "Геннадьевич",
        "tel_number": "+375297678901",
        "date_birthday": "2000-03-24T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 26,
        "first_name": "Диана",
        "middle_name": "Романова",
        "last_name": "Олеговна",
        "tel_number": "+375298789012",
        "date_birthday": "2001-11-06T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 27,
        "first_name": "Михаил",
        "middle_name": "Марков",
        "last_name": "Витальевич",
        "tel_number": "+375299890123",
        "date_birthday": "1998-09-17T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 28,
        "first_name": "Ангелина",
        "middle_name": "Кузьмина",
        "last_name": "Артемовна",
        "tel_number": "+375291901234",
        "date_birthday": "2003-12-28T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 29,
        "first_name": "Константин",
        "middle_name": "Лазарев",
        "last_name": "Ильич",
        "tel_number": "+375292012345",
        "date_birthday": "2000-02-09T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 30,
        "first_name": "Евгения",
        "middle_name": "Борисова",
        "last_name": "Сергеевна",
        "tel_number": "+375293123456",
        "date_birthday": "2001-06-21T00:00:00.000Z",
        "group_id": 1
    },
    {
        "id": 31,
        "first_name": "Арсений",
        "middle_name": "Комаров",
        "last_name": "Алексеевич",
        "tel_number": "+375294234567",
        "date_birthday": "1999-04-03T00:00:00.000Z",
        "group_id": 1
    }
];
const group3StudList = [
    {
        "id": 1,
        "first_name": "Иван",
        "middle_name": "Иванов",
        "last_name": "Иванович",
        "tel_number": "+375291234567",
        "date_birthday": "2000-01-15T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 2,
        "first_name": "Мария",
        "middle_name": "Петрова",
        "last_name": "Сергеевна",
        "tel_number": "+375292345678",
        "date_birthday": "2001-03-22T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 3,
        "first_name": "Александр",
        "middle_name": "Сидоров",
        "last_name": "Алексеевич",
        "tel_number": "+375293456789",
        "date_birthday": "1999-05-10T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 4,
        "first_name": "Ольга",
        "middle_name": "Кузнецова",
        "last_name": "Дмитриевна",
        "tel_number": "+375294567890",
        "date_birthday": "2002-07-18T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 5,
        "first_name": "Дмитрий",
        "middle_name": "Васильев",
        "last_name": "Николаевич",
        "tel_number": "+375295678901",
        "date_birthday": "2000-09-25T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 6,
        "first_name": "Елена",
        "middle_name": "Павлова",
        "last_name": "Андреевна",
        "tel_number": "+375296789012",
        "date_birthday": "2001-11-30T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 7,
        "first_name": "Сергей",
        "middle_name": "Семенов",
        "last_name": "Викторович",
        "tel_number": "+375297890123",
        "date_birthday": "1998-02-14T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 8,
        "first_name": "Татьяна",
        "middle_name": "Голубева",
        "last_name": "Игоревна",
        "tel_number": "+375298901234",
        "date_birthday": "2003-04-20T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 9,
        "first_name": "Андрей",
        "middle_name": "Козлов",
        "last_name": "Олегович",
        "tel_number": "+375299012345",
        "date_birthday": "2000-06-05T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 10,
        "first_name": "Наталья",
        "middle_name": "Николаева",
        "last_name": "Валерьевна",
        "tel_number": "+375291123456",
        "date_birthday": "2001-08-12T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 11,
        "first_name": "Павел",
        "middle_name": "Морозов",
        "last_name": "Анатольевич",
        "tel_number": "+375292234567",
        "date_birthday": "1999-10-19T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 12,
        "first_name": "Юлия",
        "middle_name": "Волкова",
        "last_name": "Сергеевна",
        "tel_number": "+375293345678",
        "date_birthday": "2002-12-25T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 13,
        "first_name": "Виктор",
        "middle_name": "Алексеев",
        "last_name": "Игоревич",
        "tel_number": "+375294456789",
        "date_birthday": "2000-02-28T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 14,
        "first_name": "Екатерина",
        "middle_name": "Лебедева",
        "last_name": "Дмитриевна",
        "tel_number": "+375295567890",
        "date_birthday": "2001-04-15T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 15,
        "first_name": "Артем",
        "middle_name": "Соколов",
        "last_name": "Андреевич",
        "tel_number": "+375296678901",
        "date_birthday": "1999-06-22T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 16,
        "first_name": "Марина",
        "middle_name": "Ковалева",
        "last_name": "Алексеевна",
        "tel_number": "+375297789012",
        "date_birthday": "2002-08-30T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 17,
        "first_name": "Никита",
        "middle_name": "Зайцев",
        "last_name": "Владимирович",
        "tel_number": "+375298890123",
        "date_birthday": "2000-10-05T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 18,
        "first_name": "Кристина",
        "middle_name": "Ершова",
        "last_name": "Ивановна",
        "tel_number": "+375299901234",
        "date_birthday": "2001-12-12T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 19,
        "first_name": "Роман",
        "middle_name": "Тихонов",
        "last_name": "Андреевич",
        "tel_number": "+375291012345",
        "date_birthday": "1998-01-17T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 20,
        "first_name": "Алина",
        "middle_name": "Федорова",
        "last_name": "Викторовна",
        "tel_number": "+375292123456",
        "date_birthday": "2003-03-24T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 21,
        "first_name": "Владислав",
        "middle_name": "Комаров",
        "last_name": "Степанович",
        "tel_number": "+375293234567",
        "date_birthday": "2000-05-31T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 22,
        "first_name": "Людмила",
        "middle_name": "Орлова",
        "last_name": "Анатольевна",
        "tel_number": "+375294345678",
        "date_birthday": "2001-07-07T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 23,
        "first_name": "Георгий",
        "middle_name": "Андреев",
        "last_name": "Романович",
        "tel_number": "+375295456789",
        "date_birthday": "1999-09-14T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 24,
        "first_name": "Валерия",
        "middle_name": "Макарова",
        "last_name": "Дмитриевна",
        "tel_number": "+375296567890",
        "date_birthday": "2002-11-21T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 25,
        "first_name": "Станислав",
        "middle_name": "Никитин",
        "last_name": "Геннадьевич",
        "tel_number": "+375297678901",
        "date_birthday": "2000-01-28T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 26,
        "first_name": "Диана",
        "middle_name": "Захарова",
        "last_name": "Олеговна",
        "tel_number": "+375298789012",
        "date_birthday": "2001-03-07T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 27,
        "first_name": "Михаил",
        "middle_name": "Борисов",
        "last_name": "Витальевич",
        "tel_number": "+375299890123",
        "date_birthday": "1998-05-14T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 28,
        "first_name": "Ангелина",
        "middle_name": "Киселева",
        "last_name": "Артемовна",
        "tel_number": "+375291901234",
        "date_birthday": "2003-07-21T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 29,
        "first_name": "Константин",
        "middle_name": "Григорьев",
        "last_name": "Ильич",
        "tel_number": "+375292012345",
        "date_birthday": "2000-09-28T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 30,
        "first_name": "Евгения",
        "middle_name": "Титова",
        "last_name": "Сергеевна",
        "tel_number": "+375293123456",
        "date_birthday": "2001-11-05T00:00:00.000Z",
        "group_id": 2
    },
    {
        "id": 31,
        "first_name": "Арсений",
        "middle_name": "Куликов",
        "last_name": "Алексеевич",
        "tel_number": "+375294234567",
        "date_birthday": "1999-12-12T00:00:00.000Z",
        "group_id": 2
    }
];







router.post('/start', async (request, response) => {
    try {
        const users = await prisma.user.findMany();
        const updateUsers = await Promise.all(users.map(async (user) => {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    middle_name: user.last_name,
                    last_name: user.middle_name,
                }

            })
        }))
        // const users = await Promise.all(
        //     group3StudList.map(async (student) => {
        //         await prisma.student.create({
        //             data: {
        //                 first_name: student.first_name,
        //                 middle_name: student.middle_name,
        //                 last_name: student.last_name,
        //                 tel_number: student.tel_number,
        //                 date_birthday: new Date(student.date_birthday),
        //                 group_id: 3,
        //             },
        //         });
        //     })
        // );


        // Получаем список студентов из группы 1
        // const studentList = await prisma.student.findMany({
        //     where: {
        //         group_id: 3,
        //     },
        // });

        // const semester_ids = [21, 22];

        // const subject_ids = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19];

        // const markRand = () => Math.floor(Math.random() * 7 + 4).toString();

        // const is_exam = false;

        // const marks = await prisma.mark.createMany({
        //     data: studentList.flatMap(student =>
        //         semester_ids.flatMap(semester_id =>
        //             subject_ids.map(subject_id => ({
        //                 student_id: student.id,
        //                 semester_id: semester_id,
        //                 subject_id: subject_id,
        //                 mark: markRand(),
        //                 is_exam: is_exam,
        //             }))
        //         )
        //     ),
        // });


        // const marks = await prisma.mark.deleteMany({
        //     where: {
        //         student: {
        //             group_id: 2
        //         }

        //     },
        // });



        // const year = 2025;
        // const month = 1; // JS считает месяцы с 0

        // const getRandomabsence_illness = () => Math.floor(Math.random() * 10);
        // const getRandomabsence_order = () => Math.floor(Math.random() * 3);
        // const getRandomabsence_resp = () => Math.floor(Math.random() * 5);
        // const getRandomabsence_disresp = () => Math.floor(Math.random() * 4);

        // const absences = await prisma.absence.createMany({
        //     data: studentList.map(student => ({
        //         student_id: student.id,
        //         year: year,
        //         month: month,
        //         absence_illness: getRandomabsence_illness(),
        //         absence_order: getRandomabsence_order(),
        //         absence_resp: getRandomabsence_resp(),
        //         absence_disresp: getRandomabsence_disresp()
        //     })),
        // });
        // const absences = await prisma.absence.deleteMany({
        //     where: {
        //         student: {
        //             group_id: 1
        //         }
        //     }
        // });




        response.status(200).json({ message: "Пользователи успешно созданы", updateUsers });
    } catch (error) {
        console.error('Ошибка при создании пропусков:', error);
        response.status(500).json({ message: 'Ошибка при создании пропусков' });
    }
});








module.exports = router;