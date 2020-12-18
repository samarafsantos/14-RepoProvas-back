const joi = require('joi');

const exam = joi.object({
    examName: joi.string().required(),
    category: joi.string().pattern(/P1|P2|P3|PF|2ch|Outras/).required(),
    link: joi.string().uri().required(),
    chosenSubject: joi.object().required(),
    chosenTeacher: joi.object().required()
})

module.exports={
    exam 
}