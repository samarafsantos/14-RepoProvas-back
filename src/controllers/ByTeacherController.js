const connection = require('../database/index');

async function getTeachers(req, res){
    //const teachers = await connection.query('SELECT te.id, te.name, ex.name as "year", ex.type, ex.link FROM teachers as te JOIN exams as ex ON ex.id_teacher = te.id;');
    const teachers = await connection.query('SELECT * FROM teachers');
    res.status(200).send(teachers.rows);
}

async function getExams(req, res){
    const { id } = req.params;
    const exams = await connection.query('SELECT e.id, e.link, e.name, e.type, s.name as subject FROM exams as "e" JOIN subjects as "s" ON e.id_subject = s.id where e.id_teacher=$1', [id]);
    res.status(200).send(exams.rows);
}


module.exports ={
    getTeachers,
    getExams
}