const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const ByTeacherController = require('./controllers/ByTeacherController')

// -------------ROTAS-------------------

app.get('/api/get-teachers', ByTeacherController.getTeachers);



// -------------------------------------
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

module.exports = app;