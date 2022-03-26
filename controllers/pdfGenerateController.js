const Question = require("../models/question");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.pdfGenerate = async(req, res) => {
    try {
        const { matches, Mcqs, difficulty, TF, subject, topics } = req.body;
        // console.log(req.body)
        var McqQuestions = [],
            MatchQuestions = [],
            // descriptivesQuestion = [],
            TFQuestions = [];

        var difficultyLevel;
        for (let i = 0; i < Mcqs; i++) {
            if (difficulty == "Easy") {
                if (i <= 0.4 * Mcqs) {
                    difficultyLevel = "Easy";
                } else if (i > 0.4 * Mcqs && i <= 0.7 * Mcqs) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            } else if (difficulty == "Moderate") {
                if (i <= 0.3 * Mcqs) {
                    difficultyLevel = "Easy";
                } else if (i > 0.3 * Mcqs && i <= 0.7 * Mcqs) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            } else {
                if (i <= 0.3 * Mcqs) {
                    difficultyLevel = "Easy";
                } else if (i > 0.3 * Mcqs && i <= 0.6 * Mcqs) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            }
            let topic = topics[Math.floor(Math.random() * (topics.length))]
            const questions = await Question.find({
                difficulty: difficultyLevel,
                questionType: "MCQs",
                // Check this(atleast one topic match between arrays)
                topics: topic,
                subject,
                verified: true
            })
            console.log(questions)
                // }).skip(random);
            var random = Math.floor(Math.random() * questions.length);
            //console.log(questions[random]);
            const question = questions[random]
            var findQues = McqQuestions.find((element) => element == question);
            if (findQues == undefined) {
                if (question != null) {
                    McqQuestions.push(question);
                }
            } else {
                i--;
            }
        }
        // for (i = 0; i < descriptives; i++) {
        //   if(difficulty=="Easy"){
        //     if (i <= 0.4 * descriptives) {
        //       difficultyLevel = "Easy";
        //     } else if (i > 0.4 * descriptives && i <= 0.7 * descriptives) {
        //       difficultyLevel = "Medium";
        //     } else {
        //       difficultyLevel = "Hard";
        //     }
        //   }else if(difficulty=="Medium"){
        //     if (i <= 0.3 * descriptives) {
        //       difficultyLevel = "Easy";
        //     } else if (i > 0.3 * descriptives && i <= 0.7 * descriptives) {
        //       difficultyLevel = "Medium";
        //     } else {
        //       difficultyLevel = "Hard";
        //     }
        //   }else{
        //     if (i <= 0.3 * descriptives) {
        //       difficultyLevel = "Easy";
        //     } else if (i > 0.3 * descriptives && i <= 0.6 * descriptives) {
        //       difficultyLevel = "Medium";
        //     } else {
        //       difficultyLevel = "Hard";
        //     }
        //   }

        //   var random = Math.floor(Math.random() * 5);
        //   let topic = topics[Math.floor(Math.random()*(topics.length))]
        //   const questions = await Question.find({
        //     difficulty: difficultyLevel,
        //     questionType: "descriptive",
        //     topics: topic ,
        //     subject,
        //     verified: true
        //   })
        //   var random = Math.floor(Math.random() * questions.length);
        //   //console.log(questions[random]);
        //   const question = questions[random]
        //   var findQues = descriptivesQuestion.find(
        //     (element) => element == question
        //   );
        //   if (findQues == undefined) {
        //     if (question != null) {
        //       descriptivesQuestion.push(question);
        //     }
        //   } else {
        //     i--;
        //   }
        // }
        for (let i = 0; i < matches; i++) {
            if (difficulty == "Easy") {
                if (i <= 0.4 * matches) {
                    difficultyLevel = "Easy";
                } else if (i > 0.4 * matches && i <= 0.7 * matches) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            } else if (difficulty == "Moderate") {
                if (i <= 0.3 * matches) {
                    difficultyLevel = "Easy";
                } else if (i > 0.3 * matches && i <= 0.7 * matches) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            } else {
                if (i <= 0.3 * matches) {
                    difficultyLevel = "Easy";
                } else if (i > 0.3 * matches && i <= 0.6 * matches) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            }

            var random = Math.floor(Math.random() * 5);
            let topic = topics[Math.floor(Math.random() * (topics.length))]
            const questions = await Question.find({
                    difficulty: difficultyLevel,
                    questionType: "Matches",
                    topics: topic,
                    subject,
                    verified: true
                })
                // .skip(random);
            console.log(questions)
            var random = Math.floor(Math.random() * questions.length);
            //console.log(questions[random]);
            const question = questions[random]
            var findQues = MatchQuestions.find((element) => element == question);
            if (findQues == undefined) {
                if (question != null) {
                    MatchQuestions.push(question);
                }
            } else {
                i--;
            }
        }

        for (let i = 0; i < TF; i++) {
            if (difficulty == "Easy") {
                if (i <= 0.4 * TF) {
                    difficultyLevel = "Easy";
                } else if (i > 0.4 * TF && i <= 0.7 * TF) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            } else if (difficulty == "Moderate") {
                if (i <= 0.3 * TF) {
                    difficultyLevel = "Easy";
                } else if (i > 0.3 * TF && i <= 0.7 * TF) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            } else {
                if (i <= 0.3 * TF) {
                    difficultyLevel = "Easy";
                } else if (i > 0.3 * TF && i <= 0.6 * TF) {
                    difficultyLevel = "Moderate";
                } else {
                    difficultyLevel = "Hard";
                }
            }

            let topic = topics[Math.floor(Math.random() * (topics.length))]
            const questions = await Question.find({
                    difficulty: difficultyLevel,
                    questionType: "True/False",
                    topics: topic,
                    subject,
                    verified: true
                })
                // .skip(random);
            console.log(questions)
            var random = Math.floor(Math.random() * questions.length);
            //console.log(questions[random]);
            const question = questions[random]
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
        doc.pipe(fs.createWriteStream("Question.pdf"));
        doc.pipe(res);
        // const doc=new PDFDocument();
        // doc.pipe(fs.createWriteStream("Solutions.pdf"));
        // doc.pipe(res);
        doc.fontSize(32)
        doc.font('Times-Bold')
        doc.text(`HoardQ`, { width: 410, align: "center" })
        doc.moveDown()
        doc.font('Times-Roman')
        doc.fontSize(14)
        doc.text(`Subject: ${subject}`, { width: 410, align: "left" }).f
        doc.moveDown()
        let conTopics = ''
        for (let topic of topics) {
            conTopics += `•${topic} `
        }
        doc.text(`Topics: ${conTopics}`, { width: 410, align: "left" })
        doc.moveDown()
        doc.text(`Difficulty: ${difficulty}`, { width: 410, align: "left" })
        doc.moveDown(3)
            //For MCQType:
        if (Mcqs) {
            doc.font('Times-Bold')
            doc.text("Multiple Choice Questions", {
                width: 410,
                align: "center",
                underline: true

            });
            doc.moveDown();
            doc.font('Times-Roman')
            McqQuestions.map((question, i) => {
                doc.text(`Q${i + 1}) ${question.description}`).moveDown();
                doc.text('Options:').moveDown()
                question.option.options.map((option, j) => {
                    doc.text(`${j + 1}) ${option}`).moveDown();
                });
            });
        }

        //True/False Section:-
        if (TF) {
            doc.font('Times-Bold')
            doc.text("True/False", {
                width: 410,
                align: "center",
                underline: true

            });
            doc.moveDown();
            doc.font('Times-Roman')
            TFQuestions.map((question, i) => {
                doc.text(`Q${i + 1}) ${question.description}`).moveDown();
            });
        }

        //For MatchQuestion
        if (matches) {
            doc.font('Times-Bold')
            doc.text("Match the following", {
                width: 410,
                align: "center"

            });

            doc.moveDown();

            doc.font('Times-Roman')
            MatchQuestions.map((question, i) => {
                doc.text(`Q${i + 1}) ${question.description}`).moveDown();
                let arr = [...question.option.matchOptions.rhs]
                const shuffRHS = arr.sort((a, b) => 0.5 - Math.random());
                doc
                    .text(
                        `
              Column A                                                      Column B
            `
                    )
                    .moveDown();
                [...Array(question.option.matchOptions.lhs.length).keys()].map((index) => {
                    doc
                        .text(
                            `${
              question.option.matchOptions.lhs[index]
            }                                                      ${
              shuffRHS[index]
                          }`, {
                                width: 410,
                                align: "center"
                            }
                        )
                        .moveDown();
                })
            });
        }
        doc.addPage()
        doc.fontSize(18)
        doc.font('Times-Bold')
        doc.text('Solutions', {
            width: 410,
            align: "center",
            underline: true
        }).moveDown(2)
        doc.font('Times-Roman')
        doc.fontSize(14)
        if (Mcqs) {
            doc.text("Multiple Choice Questions", {
                width: 410,
                align: "center",
                underline: true
            })
            doc.moveDown();


            McqQuestions.map((question, i) => {
                doc.text(`${i + 1}) ${question.answer}`).moveDown();

                if (question.solution) {
                    doc.text(`Solution:
                    ${question.solution}`).moveDown();
                }
            });
        }
        if (TF) {
            doc.text("True/False", {
                width: 410,
                align: "center",
                underline: true
            });

            doc.moveDown();



            TFQuestions.map((question, i) => {
                doc.text(`${i + 1}) ${question.answer}`).moveDown();
                if (question.solution) {
                    doc.text(`Solution:
                    ${question.solution}`).moveDown();
                }
            });
        }
        if (matches) {
            doc.text("Match the following", {
                width: 410,
                align: "center",
                underline: true
            });

            doc.moveDown();



            MatchQuestions.map((question, i) => {
                doc.text(`${i + 1})`).moveDown();
                doc
                    .text(
                        `
              Column A                                                      Column B
            `
                    )
                    .moveDown();
                [...Array(question.option.matchOptions.lhs.length).keys()].map((index) => {


                    doc
                        .text(
                            `${
              question.option.matchOptions.lhs[index]
            }                                                      ${
              question.option.matchOptions.rhs[index]
            }`, {
                                width: 410,
                                align: "center"
                            })
                        .moveDown();
                })

            })
        }

        doc.end();

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
};