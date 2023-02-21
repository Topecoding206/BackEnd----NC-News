exports.handlePathError = (request, response, next) => {
  response.status(404).send({ msg: "invalid-path" });
  next();
};
exports.handleError404 = (error, request, response, next) => {
  if (error === "not-found") {
    response.status(404).send({ msg: "not found" });
  }
  next(error);
};
exports.handleError400 = (error, request, response, next) => {
  if (error === "bad-request") {
    response.status(400).send({ msg: "Bad Request" });
  }
  next(error);
};
