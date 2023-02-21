exports.handlePathError = (request, response, next) => {
  response.status(404).send({ msg: "invalid-path" });
};
exports.customError = (error, request, response, next) => {
  if (error === "not-found") {
    response.status(404).send({ msg: "not found" });
  } else if (error === "bad-request") {
    response.status(400).send({ msg: "Bad Request" });
  } else if (error === "exist not found") {
    response.status(404).send({ comment: [] });
  }
  next(error);
};
