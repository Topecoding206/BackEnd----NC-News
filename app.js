const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesIdByComment,
  postCommentById,
} = require("./controller");
const {
  handlePathError,
  customError,
  handleError404,
} = require("./errorHandler");
const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comment", getArticlesIdByComment);
app.post("/api/articles/:article_id/comment", postCommentById);
app.get("/api/*", handlePathError);
app.use(customError);
app.use(handleError404);

module.exports = app;
