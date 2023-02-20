const express = require("express");
const { getTopics } = require("./controller");
const { handleError400 } = require("./errorHandler");
const app = express();

app.get("/api/topics", getTopics);

app.use(handleError400);

module.exports = app;
