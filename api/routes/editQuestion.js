const editQuestionRouter = require('express').Router();
const Question = require('../../models/question.js');

editQuestionRouter.put('/:id',async(req,res)=>{
    try{
       const {description,answer,solution,topics,difficulty} = req.body;
       let editQuestion = await Question.findById(req.params.id);
       if(!editQuestion)
        return res.status(400).json({message:"Question not found"});
        editQuestion.description = description?description:editQuestion.description;
        editQuestion.answer = answer?answer:editQuestion.answer;
        editQuestion.solution = solution?solution:editQuestion.solution;
        editQuestion.topics = topics?topics:editQuestion.topics;
        editQuestion.difficulty = difficulty?difficulty:editQuestion.difficulty;

        await editQuestion.save();
        return res.status(200).json({message:"Question updated successfully"})
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

module.exports = editQuestionRouter;
