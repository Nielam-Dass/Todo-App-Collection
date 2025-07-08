const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    res.status(200).send("MERN TODO APP!");
});

app.listen(3000);
