const {
  fetchTopics,
  fetchArticles,
  fetchArticleByIdComment,
  insertCommentById,
} = require("./model");

exports.getTopics = (request, response, next) => {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getArticles = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticles(article_id)
    .then((articles) => {
      if (articles.length < 1) return Promise.reject("not-found");
      if (articles.length === 1) {
        response.status(200).send({ article: articles });
      } else {
        response.status(200).send({ articles: articles });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.getArticlesIdByComment = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleByIdComment(article_id)
    .then((result) => {
      if (result.length < 1) return Promise.reject("not-found");
      if (result.length === 1) {
        response.status(200).send({ comment: result });
      } else {
        response.status(200).send({ comments: result });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.postCommentById = (request, response, next) => {
  const { article_id } = request.params;
  const objBody = request.body;

  insertCommentById(article_id, objBody)
    .then((body) => {
      response.status(201).send({ comment: body });
    })
    .catch((error) => {
      next(error);
    });
};
