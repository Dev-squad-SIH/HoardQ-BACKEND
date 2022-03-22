const addQuestionRouter = require('express').Router();
const Question = require('../../models/question.js');
const Expert = require('../../models/expert.js');

addQuestionRouter.post('/add-question',async(req,res)=>{
    try{
        const {description,difficulty,subject,option,questionType,solution,answer,image } = req.body;
		if (!description || !subject || !questionType || !answer ) {
			return res.status(400).json({ message: "Fill all required details" });
		}
        else{
            const question = new Question();
            question.description = description;
            question.difficulty = difficulty;
            question.subject = subject;
            question.option = option;
            question.questionType = questionType;
            question.solution = solution;
            question.answer = answer;
            question.image = image;
            if(((questionType == "descriptive" && (option == null || option == undefined || !option) ))||
            (questionType == "MCQs" && option.options)||
            (questionType == "Matches" && option.matchOptions)||
            (questionType == "FillUps" && option.fillUp)||
            (questionType == "True/False" && option.boolField))
            {
                await question.save();

                let subject = question.subject;
                let experts = await Expert.find({subjects:{$in: subject}});
                let min=experts[0].questionsAssigned.length ,index=0,i=0;
                for(i=0;i<experts.length;i++)
                {
                    if(experts[i].questionsAssigned.length < min)
                    {
                        index = i;
                        min = experts[i].questionsAssigned.length;
                    }
                }

                experts[index].questionsAssigned.push( question._id);
                await experts[index].save();
                return res.status(200).json({message:"Question added successfully"});
            }
            else{
                return res.status(400).json({message:"Question type and options doesn't match"});
            }
            // return res.status(400).json({message:"Question not added"});
        }
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

module.exports = addQuestionRouter;
