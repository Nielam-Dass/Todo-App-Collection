const express = require("express");


const app = express();

app.use(express.json());  // Parses JSON payloads to populate request body with data

app.use("/", require("./routes/root"));

app.use("/task", require("./routes/task"));

module.exports = app;
