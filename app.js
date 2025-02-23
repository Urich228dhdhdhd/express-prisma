const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const listOfSubjectRoutes = require('./routes/listOfSubjectRoutes');
const absenceRoutes = require('./routes/absenceRoutes');
const semesterRoutes = require('./routes/semesterRoutes');
const markRoutes = require('./routes/markRoutes');
const reportRoutes = require('./routes/reportRoutes');

const srartRoutes = require('./routes/start_routes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/listOfSubjects', listOfSubjectRoutes);
app.use('/api/absences', absenceRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/marks', markRoutes);
app.use('/api/reports', reportRoutes);

app.use('/api/starts', srartRoutes);

// Установка порта через переменную окружения или по умолчанию на 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
