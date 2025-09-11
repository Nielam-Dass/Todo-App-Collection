const express = require("express");
const { configureMongoose } = require("./config/mongooseConfig");

configureMongoose();
const app = express();

app.use(express.json());  // Parses JSON payloads to populate request body with data

app.use("/", require("./routes/root"));

app.use("/task", require("./routes/task"));

app.listen(3000, () => console.log("Server listening on port 3000..."));
