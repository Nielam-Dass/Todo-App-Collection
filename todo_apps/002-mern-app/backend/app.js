require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database...");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use("/", require("./routes/root"));

app.listen(3000, () => console.log("Server listening on port 3000..."));
