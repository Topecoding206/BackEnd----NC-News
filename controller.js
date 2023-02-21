const { fetchTopics, fetchArticles } = require("./model");

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
