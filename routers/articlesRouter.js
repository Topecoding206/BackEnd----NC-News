const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesIdByComment,
  patchArticleById,
  postCommentById,
} = require("../controller");

articlesRouter.route("/").get(getArticles);

articlesRouter.route("/:article_id").get(getArticles).patch(patchArticleById);

articlesRouter
  .route("/:article_id/comment")
  .get(getArticlesIdByComment)
  .post(postCommentById);
module.exports = articlesRouter;
