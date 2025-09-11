require("dotenv").config();
const mongoose = require("mongoose");


function configureMongoose() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Connected to database...");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { configureMongoose };
