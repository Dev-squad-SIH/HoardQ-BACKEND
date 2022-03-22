const Question = require("../models/question");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.pdfGenerate = async (req, res) => {
  try {
    const {matches , descriptives , Mcqs , difficulty, TF,topics}= req.body;
  
    var McqQuestions = [],
      MatchQuestions = [],
      descriptivesQuestion = [],
      TFQuestions = [];

    var difficultyLevel;
    for (i = 0; i < Mcqs; i++) {
      if(difficulty=="easy"){
      if (i <= 0.4 * Mcqs) {
        difficultyLevel = "easy";
      } else if (i > 0.4 * Mcqs && i <= 0.7 * Mcqs) {
        difficultyLevel = "medium";
      } else {
        difficultyLevel = "hard";
      }
    }else if(difficulty=="medium"){
        if (i <= 0.3 * Mcqs) {
          difficultyLevel = "easy";
        } else if (i > 0.3 * Mcqs && i <= 0.7 * Mcqs) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
    }else{
      if (i <= 0.3 * Mcqs) {
        difficultyLevel = "easy";
      } else if (i > 0.3 * Mcqs && i <= 0.6 * Mcqs) {
        difficultyLevel = "medium";
      } else {
        difficultyLevel = "hard";
      }
    }
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: difficultyLevel,
        questionType: "MCQ",
        topics:topics
      }).skip(random);
      // console.log(question);
      var findQues = McqQuestions.find((element) => element == question);
      if (findQues == undefined) {
        if(question!=null){
        McqQuestions.push(question);
        }
      } else {
        i--;
      }
    }
    for (i = 0; i < descriptives; i++) {
      if(difficulty=="easy"){
        if (i <= 0.4 * descriptives) {
          difficultyLevel = "easy";
        } else if (i > 0.4 * descriptives && i <= 0.7 * descriptives) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }else if(difficulty=="medium"){
        if (i <= 0.3 * descriptives) {
          difficultyLevel = "easy";
        } else if (i > 0.3 * descriptives && i <= 0.7 * descriptives) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }else{
        if (i <= 0.3 * descriptives) {
          difficultyLevel = "easy";
        } else if (i > 0.3 * descriptives && i <= 0.6 * descriptives) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }
    
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: difficultyLevel,
        questionType: "descriptive",
        topics:topics
      }).skip(random);
      var findQues = descriptivesQuestion.find(
        (element) => element == question
      );
      if (findQues == undefined) {
        if (question != null) {
          descriptivesQuestion.push(question);
        }
      } else {
        i--;
      }
    }
    for (i = 0; i < matches; i++) {
      if(difficulty=="easy"){
        if (i <= 0.4 * matches) {
          difficultyLevel = "easy";
        } else if (i > 0.4 * matches && i <= 0.7 * matches) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }else if(difficulty=="medium"){
        if (i <= 0.3 * matches) {
          difficultyLevel = "easy";
        } else if (i > 0.3 * matches && i <= 0.7 * matches) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }else{
        if (i <= 0.3 * matches) {
          difficultyLevel = "easy";
        } else if (i > 0.3 * matches && i <= 0.6 * matches) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }
      
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: difficultyLevel,
        questionType: "Match",
        topics:topics
      }).skip(random);
      var findQues = MatchQuestions.find((element) => element == question);
      if (findQues == undefined) {
        if (question != null) {
          MatchQuestions.push(question);
        }
      } else {
        i--;
      }
    }

    for (i = 0; i < TF; i++) {
      if(difficulty=="easy"){
        if (i <= 0.4 * TF) {
          difficultyLevel = "easy";
        } else if (i > 0.4 *TF && i <= 0.7 *TF) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }else if(difficulty=="medium"){
        if (i <= 0.3 * TF) {
          difficultyLevel = "easy";
        } else if (i > 0.3 *TF && i <= 0.7 *TF) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }else{
        if (i <= 0.3 * TF) {
          difficultyLevel = "easy";
        } else if (i > 0.3 *TF && i <= 0.6 *TF) {
          difficultyLevel = "medium";
        } else {
          difficultyLevel = "hard";
        }
      }
      
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: difficultyLevel,
        questionType: "true/false",
        topics:topics
      }).skip(random);
      var findQues = TFQuestions.find((element) => element == question);
      if (findQues == undefined) {
        if (question != null) {
          TFQuestions.push(question);
        }
      } else {
        i--;
      }
    }

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("output.pdf"));
    doc.pipe(res);

    const doc1=new PDFDocument();
    doc1.pipe(fs.createWriteStream("Solutions.pdf"));
    doc1.pipe(res);

    //For MCQType:

    doc.text("MCQ Section", {
      width: 410,
      align: "center",
    });
    doc.moveDown();

    doc1.text("MCQ Section Solutions",{
      width: 410,
      align: "center",
    })
   doc1.moveDown();

    var i = 0;
    McqQuestions.map((question) => {
      var j = 0;
      doc.text(`Q${i + 1}.${question.description}`).moveDown();

      question.option.options.map((option) => {
        doc.text(`${j + 1}.${option}`).moveDown();
        j++;
      });
      i++;
    });
    i=0;
    McqQuestions.map((question) => {
      doc1.text(`Ans${i + 1}.${question.answer}`).moveDown();

      if(question.solution){
        doc1.text(`Solution:${question.solution}`).moveDown();
      }
      i++;
    });

    //For descriptives:-

    doc.text("Descriptive Section", {
      width: 410,
      align: "center",
    });
   
    doc.moveDown();

    doc1.text("Descriptive Section Solutions", {
      width: 410,
      align: "center",
    });
   
    doc1.moveDown();
    i = 0;
    descriptivesQuestion.map((question) => {
      doc.text(`Q${i + 1}.${question.description}`).moveDown();
      i++;
    });

    i = 0;
    descriptivesQuestion.map((question) => {
      doc1.text(`Ans${i + 1}.${question.answer}`).moveDown();
      if(question.solution){
        doc1.text(`Solution:${question.solution}`).moveDown();
      }
      i++;
    });

    //True/False Section:-
    doc.text("True/False Section", {
      width: 410,
      align: "center",
    });

    doc.moveDown();
    
    doc1.text("True/False Section Solutions", {
      width: 410,
      align: "center",
    });

    doc1.moveDown();

    i = 0;
    TFQuestions.map((question) => {
      doc.text(`Q${i + 1}.${question.description}`).moveDown();
      i++;
    });

    i = 0;
    TFQuestions.map((question) => {
      doc1.text(`Ans${i + 1}.${question.answer}`).moveDown();
      if(question.solution){
        doc1.text(`Solution:${question.solution}`).moveDown();
      }
      i++;
    });

    //For MatchQuestion
    doc.text("Matching Section", {
      width: 410,
      align: "center",
    });

    doc.moveDown();

    doc1.text("Matching Section Solutions", {
      width: 410,
      align: "center",
    });

    doc1.moveDown();

    i = 0;
    MatchQuestions.map((question) => {
      doc.text(`Q${i + 1}.${question.description}`).moveDown();
      j = 0;
      question.option.matchOptions.map((option) => {
        doc
          .text(
            `${j + 1}.${
              option.row.lhs
            }                                                      ${
              option.row.rhs
            }`
          )
          .moveDown();
        j++;
      });
      i++;
    });

    i=0;
    MatchQuestions.map((question)=>{
      doc1.text(`Ans${i+1}.${question.answer}`).moveDown();
      if(question.solution){
        doc1.text(`Solution:${question.solution}`).moveDown();
      }
      i++;
    })
    doc1.end();
    doc.end();
  } catch (err) {
    console.log(err);
  }
};
