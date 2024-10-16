const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const listOfSubjectRoutes = require('./routes/listOfSubjectRoutes');
const absenceRoutes = require('./routes/absenceRoutes');
const semesterRoutes = require('./routes/semesterRoutes');
const markRoutes = require('./routes/markRoutes');



app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/listOfSubjects', listOfSubjectRoutes);
app.use('/api/absences', absenceRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/marks', markRoutes);


app.listen(3000);