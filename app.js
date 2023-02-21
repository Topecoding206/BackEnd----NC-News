const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesIdByComment,
} = require("./controller");
const { handlePathError, customError } = require("./errorHandler");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getArticlesIdByComment);

app.get("/api/*", handlePathError);

app.use(customError);

module.exports = app;
