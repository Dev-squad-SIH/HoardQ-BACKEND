const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Question Description is required"],
    minLength: 10,
  },
  difficulty: {
    type: String,
    required: [true, "Please give question difficulty level"],
    enum: ["easy", "medium", "hard"],
  },
  topics: [
    {
      topic: {
        type: String,
        required: true,
      },
    },
  ],
  option: {
    options:[
      {
        optionDesc:{
          type:String
        }
      }
    ],
    fillUp:{
      type:String
    },
    boolField:{
      type:boolean
    },
    matchOptions:[
      {
       row:{
         lhs:{
           type:String,
           required:true
         },
         rhs:{
           type:String,
           required:true
         }
       }
      }
    ]
  },
  questionType: {
    type: String,
    enum: ["Match","FillUps","MCQ","descriptive","true/false"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  solution: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
