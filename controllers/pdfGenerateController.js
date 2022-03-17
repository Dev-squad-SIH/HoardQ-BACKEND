const Question = require("../models/questionModel");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.pdfGenerate = async (req, res) => {
  try {
    const matches = req.query.Matches;
    const descriptives = req.query.descriptives;
    const Mcqs = req.query.MCQs;
    const difficulty = req.query.difficulty;
    console.log(matches, descriptives, Mcqs, difficulty);
    const TF = req.query.TF;

    var McqQuestions = [],
      MatchQuestions = [],
      descriptivesQuestion = [],
      TFQuestions = [];

    for (i = 0; i < Mcqs; i++) {
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: "easy",
        questionType: "MCQ",
      }).skip(random);
      var findQues = McqQuestions.find((element) => element == question);
      if (findQues == undefined) {
        McqQuestions.push(question);
      } else {
        i--;
      }
    }
    for (i = 0; i < descriptives; i++) {
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: "easy",
        questionType: "descriptive",
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
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: "easy",
        questionType: "Match",
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
      var random = Math.floor(Math.random() * 5);
      const question = await Question.findOne({
        difficulty: "easy",
        questionType: "true/false",
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

    //For MCQType:

    doc.text("MCQ Section", {
      width: 410,
      align: "center",
    });

    doc.moveDown();

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

    //For descriptives:-
    doc.text("Descriptive Section", {
      width: 410,
      align: "center",
    });

    doc.moveDown();
    i = 0;
    descriptivesQuestion.map((question) => {
      doc.text(`Q${i + 1}.${question.description}`).moveDown();
      i++;
    });

    //True/False Section:-
    doc.text("True/False Section", {
      width: 410,
      align: "center",
    });

    doc.moveDown();
    i = 0;
    TFQuestionQuestion.map((question) => {
      doc.text(`Q${i + 1}.${question.description}`).moveDown();
      i++;
    });

    //For MatchQuestion
    doc.text("Matching Section", {
      width: 410,
      align: "center",
    });

    doc.moveDown();
    i = 0;

    MatchQuestions.map((question) => {
      doc.text(`Q${i + 1}.${question.description}`).moveDown();
      j = 0;
      question.option.matchOptions.map((option) => {
        doc
          .text(
            `${j + 1}.${ option.row.lhs }                                                      ${ option.row.rhs }`
          )
          .moveDown();
        j++;
      });
      i++;
    });
    doc.end();
  } catch (err) {
    console.log(err);
  }
};
