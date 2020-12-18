const connection = require("../database/index");
const exam = require("../schemas/exam");

async function getTeacherSubject(req,res){
    const data = await connection.query(`select t.id, t.name, s.name as subject from teachers as "t"
    join subject_teachers as st on st.id_teacher=t.id
    join subjects as s on s.id=st.id_subject`);
    res.status(200).send(data.rows);
}

async function postExam(req, res){
    const { data } = req.body;
    console.log(data);

    const { error } = exam.exam.validate(data);
    if(error) return res.sendStatus(422);

    const { examName, category, link, chosenTeacher, chosenSubject } = data;

    await connection.query(`INSERT INTO exams (name, id_subject, 
        type, link, id_teacher) VALUES ($1, $2, $3, $4, $5)`, 
        [examName, chosenSubject.id, category, link, chosenTeacher.id]);
    
    await connection.query(`UPDATE teachers SET qty_exams=qty_exams+1 WHERE id=$1`, [chosenTeacher.id]);
    await connection.query(`UPDATE subjects SET qty_exams=qty_exams+1 WHERE id=$1`, [chosenSubject.id]);
    
    res.sendStatus(201);
}

module.exports={
    getTeacherSubject,
    postExam
}