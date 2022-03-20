const expertQuestionsRouter = require('express').Router();
// const Question = require('../../models/question.js');
const Expert = require('../../models/expert.js');

expertQuestionsRouter.get('/:id',async(req,res)=>{
    try{
      const expert = await Expert.findById(req.params.id).populate('questionsAssigned').select('-password');
      if(expert)
        return res.status(200).json({expert:expert});
      return res.status(400).json({message:"Questions not found"});
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

module.exports = expertQuestionsRouter;
