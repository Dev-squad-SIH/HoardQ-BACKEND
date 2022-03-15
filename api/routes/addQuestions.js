const addQuestionRouter = require('express').Router();
const Question = require('../../models/question.js');

addQuestionRouter.post('/add-question',async(req,res)=>{
    try{
        const {description,difficulty,topics,option,questionType,solution,answer,image } = req.body;
		if (!description || !option || !topics || !questionType || !answer ) {
			return res.status(400).json({ message: "Fill all required details" });
		}
        else{
            const question = new Question();
            question.description = description;
            question.difficulty = difficulty;
            question.topics = topics;
            question.option = option;
            question.questionType = questionType;
            question.solution = solution;
            question.answer = answer;
            question.image = image;
            
            await question.save();
            return res.status(200).json({message:"Question added successfully"});
        }
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

module.exports = addQuestionRouter;
