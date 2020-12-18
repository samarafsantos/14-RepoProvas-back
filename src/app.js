const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const ByTeacherController = require('./controllers/ByTeacherController');
const BySubjectController = require('./controllers/BySubjectController')

// -------------ROTAS-------------------

app.get('/api/get-teachers', ByTeacherController.getTeachers);
app.get('/api/get-exams/:id', ByTeacherController.getExams);

app.get('/api/get-subjects', BySubjectController.getSubjects);
app.get('/api/get-exams-s/:id', BySubjectController.getExams);
// -------------------------------------
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

module.exports = app;