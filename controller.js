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

exports.getArticles = (request, response) => {
  fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
};
