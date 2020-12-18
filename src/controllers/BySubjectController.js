const connection = require('../database/index');

async function getSubjects(req, res){
    //const teachers = await connection.query('SELECT te.id, te.name, ex.name as "year", ex.type, ex.link FROM teachers as te JOIN exams as ex ON ex.id_teacher = te.id;');
    const subject = await connection.query(`select sub.id, sub.name, qty_exams, sem.name as semester from subjects as sub
    join subject_semester as subsem on subsem.id_subject = sub.id
    join semester as sem on sem.id = subsem.id_semester`);
    res.status(200).send(subject.rows);
}

async function getExams(req, res){
    const { id } = req.params;
    const exams = await connection.query(`SELECT e.id, e.name, e.type, e.link, teachers.name as teacher from exams as "e"
                                        join teachers on teachers.id = id_teacher
                                        where id_subject = $1`, [id]);
    res.status(200).send(exams.rows);
}


module.exports ={
    getSubjects,
    getExams
}