exports.handlePathError = (request, response, next) => {
  response.status(404).send({ msg: "invalid-path" });
};
exports.customError = (error, request, response, next) => {
  if (error === "not-found") {
    response.status(404).send({ msg: "not found" });
  } else if (error === "bad-request") {
    response.status(400).send({ msg: "Bad Request" });
  } else if (error === "not valid") {
    response.status(400).send({ msg: "Not Valid Id" });
  }
  next(error);
};

exports.handleError404 = (error, request, response, next) => {
  if (error.code === "23503") {
    response.status(404).send({ msg: "article not found" });
  }
};
