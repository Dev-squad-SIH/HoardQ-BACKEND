const getQuestionRouter = require('express').Router();
const Question = require('../../models/question.js');

getQuestionRouter.get('/ById/:id',async(req,res)=>{
  try {
      const question = await Question.findById(req.params.id);
      if(question)
        return res.status(200).json({question:question});
      return res.status(400).json({message:"Question not found"});
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

getQuestionRouter.post('/filter', async (req, res) => {
  try {
    const { page,limit } = req.query
    const { difficulty, subject, topics, type } = req.body
    let result = [];
    for (let topic of topics) {
      const questions = await Question.find({
        questionType:type,
        difficulty,
        subject,
        verified:true,
        topics:topic
      })
        .populate({
          path: "verifiedBy",
          select:"name profilePic"
        })
      result = [...result,...questions]
    }
    result = result.filter((value, index, self) =>
      index === self.findIndex((t) => (
      // Check
      t.id === value.id
    )))
    return res.status(200).json({
      data: result.slice((page-1)*limit,page*limit)
    })
  } catch (err) {
    return res.status(500).json({
      message:err.message
    })
  }
})
// getQuestionRouter.post('/ByType',async(req,res)=>{
//     try{
//       const {questionType} = req.body;
//       const question = await Question.find({ questionType:questionType});
//       if(question)
//         return res.status(200).json({question:question});
//       return res.status(400).json({message:"Question not found"});
//     }catch(error)
//     {
//         console.log(error.message);
//         return res.status(500).json({message:"Server error"});
//     }
// })

// getQuestionRouter.post('/ByDifficulty',async(req,res)=>{
//     try{
//       const {difficulty} = req.body;
//       const question = await Question.find({difficulty:difficulty});
//       if(question)
//         return res.status(200).json({question:question});
//       return res.status(400).json({message:"Question not found"});
//     }catch(error)
//     {
//         console.log(error.message);
//         return res.status(500).json({message:"Server error"});
//     }
// })

// getQuestionRouter.post('/ByDifficulty/NumberOfQuestions',async(req,res)=>{
//     try{
//       const {difficulty,numberOfQuestions} = req.body;
//       let question = await Question.find({difficulty:difficulty});
//       if(question.size < numberOfQuestions)
//         question = question.slice(0,question.size);
//       else
//         question = question.slice(0,numberOfQuestions);
      
//       if(question)
//         return res.status(200).json({question:question});
//       return res.status(400).json({message:"Question not found"});
//     }catch(error)
//     {
//         console.log(error.message);
//         return res.status(500).json({message:"Server error"});
//     }
// })
// getQuestionRouter.post('/ByType/NumberOfQuestions',async(req,res)=>{
//     try{
//       const {questionType,numberOfQuestions} = req.body;
//       let question = await Question.find({questionType:questionType});
//       if(question.size < numberOfQuestions)
//         question = question.slice(0,question.size+1);
//       else
//         question = question.slice(0,numberOfQuestions+1);
    
//       if(question)
//         return res.status(200).json({question:question});
//       return res.status(400).json({message:"Question not found"});
//     }catch(error)
//     {
//         console.log(error.message);
//         return res.status(500).json({message:"Server error"});
//     }
// })
// getQuestionRouter.post('/ByTopic',async(req,res)=>{
//   try{
//     const {Topic} = req.body;
//     let question = await Question.find({Topics:Topic});
    
//     if(question)
//       return res.status(200).json({question:question});
//     return res.status(400).json({message:"Questions not found"});
//   }catch(error)
//   {
//       console.log(error.message);
//       return res.status(500).json({message:"Server error"});
//   }
// })

module.exports = getQuestionRouter;
