const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
        console.log("Connected TO DB");
    });

};

module.exports = connectToDB;