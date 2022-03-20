const Expert=require('../models/expert');
const Question=require('../models/question');

exports.getExpertQuestions=async(req,res)=>{
    const expertQuestions=await Expert.findById(req.jwt_payload.id).populate('questionsAssigned').deselect('password');
    const questions=[];
    expertQuestions.map((question)=>{
        if(!question.verified){
            questions.push(question);
        }
    })

   
    res.status(200).json({
        questions
    })
}