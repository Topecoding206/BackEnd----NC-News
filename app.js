const express = require("express");
const { getTopics, getArticles } = require("./controller");
const {
  handlePathError,
  handleError404,
  handleError400,
} = require("./errorHandler");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/*", handlePathError);

app.use(handleError404);
app.use(handleError400);

module.exports = app;
