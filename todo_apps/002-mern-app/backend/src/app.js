const express = require("express");


const app = express();

app.use(express.json());  // Parses JSON payloads to populate request body with data

app.use("/", require("./routes/root"));

app.use("/task", require("./routes/task"));

app.all(/.*/, (req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
