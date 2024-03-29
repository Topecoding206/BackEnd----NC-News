const {
  fetchTopics,
  fetchArticles,
  fetchArticleByIdComment,
  insertCommentById,
  updateArticleById,
  fetchUser,
  checkTopic,
  removeCommentById,
  addComments,
  fetchUserById,
  updateComment,
} = require("./model");
const availableEndpoints = require("./endpoints.json");
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
  const { topic, sort_by, order } = request.query;
  const queriesBody = request.query;
  const articlesPromise = fetchArticles(
    article_id,
    topic,
    sort_by,
    order,
    queriesBody
  );
  const topicsPromise = checkTopic(topic);
  const commentPromise = addComments(article_id);
  Promise.all([articlesPromise, topicsPromise, commentPromise])
    .then(([articles, topics, comment]) => {
      if (articles.length < 1 && topics.length < 1)
        return Promise.reject("not-found");

      if (articles.length < 2) {
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

exports.patchArticleById = (request, response, next) => {
  const { article_id } = request.params;
  const body = request.body;
  updateArticleById(body, article_id)
    .then((result) => {
      if (result.length < 1) return Promise.reject("not-found");
      response.status(200).send({ article: result });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getUser = (request, response, next) => {
  fetchUser()
    .then((users) => {
      response.status(200).send({ users: users });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteComment = (request, response, next) => {
  const { comment_id } = request.params;
  removeCommentById(comment_id)
    .then((comment) => {
      if (comment.length < 1) return Promise.reject("not-found");
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};

exports.getEndpoints = (request, response, next) => {
  response.status(200).send({ availableEndpoints });
};

exports.getUserById = (request, response, next) => {
  const { username } = request.params;
  fetchUserById(username)
    .then((result) => {
      if (result.length < 1) return Promise.reject("not-found");
      if (result.length < 2) {
        response.status(200).send({ user: result });
      } else {
        response.status(200).send({ users: result });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchComment = (request, response, next) => {
  const { comment_id } = request.params;
  const body = request.body;
  updateComment(comment_id, body)
    .then((result) => {
      if (result.length < 1) return Promise.reject("not-found");
      response.status(200).send({ comment: result });
    })
    .catch((error) => {
      next(error);
    });
};
