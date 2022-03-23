const mongoose = require("mongoose");

const expertSchema = mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
    },
    profilePic: {
      type:String,
  },
  password:{
      type:String,
      required:true
  },
  questionsAssigned:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  numberOfQuestionsVerified:{
      type:Number,
      default:0
  },
  subjects:[{
      type:String,
      required:true
  }],
  OTP:{
      type:Number,
  }
},{ timestamps: true });

module.exports = mongoose.model("Expert", expertSchema);