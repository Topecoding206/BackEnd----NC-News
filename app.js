const express = require("express");
const { getTopics } = require("./controller");
const { handleError404 } = require("./errorHandler");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/*", handleError404);

module.exports = app;
