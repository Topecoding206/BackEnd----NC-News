exports.handleError404 = (request, response, next) => {
  response.status(404).send({ msg: "invalid-path" });
  next();
};
exports.handleError500 = (error, request, response, next) => {};
