const mongoose=require('mongoose');

const connectToDB=()=>{mongoose.connect('mongodb://localhost:27017/SIH',{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("Connected TO DB");
});

};

module.exports=connectToDB;