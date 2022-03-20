const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Question Description is required"],
    minLength: 10,
  },
  difficulty: {
    type: String,
    required: [false, "Please give question difficulty level"],
    enum: ["easy", "medium", "hard"],
  },
  topics: [
    {
      type: String,
      required:true
    },
  ],
  subject: {
      type: String,
      required:true
  },

  option: {
    options:[
      {
        type:String
      }
    ],
    fillUp:{
      type:String
    },
    boolField:{
      type:Boolean
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
    required:true
  },
  solution: {
    type: String,
  },
  answer: {
    type: String,
    required: true,
  },
  image:{
    type:String
  },
  verified:{
    type:Boolean,
    default:false
  },
  verifiedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Expert',
  },

},{ timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
