"use strict";
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 9000;

// logger
if(process.env.LOGGING == "true")
    app.use(morgan("dev"));

// mongodb
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.json({ result: "failed", code: 1, response: "Syntax Error!" });
    } else {
        next();
    }
});

// routes
app.get("/", (req, res) => {
    res.send("Authentication microservice.");
});
app.post("/health", (req, res) => {
    res.json({ result: "success", code: 0, response: "Healty!" });
});
app.use("/auth", require('./routes/auth'));

app.listen(port, () => {
    console.log("Server started on port: " + port);
});

module.exports = app;