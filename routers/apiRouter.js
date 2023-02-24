const apiRouter = require("express").Router();
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const { getEndpoints } = require("../controller");

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.route("/").get(getEndpoints);

module.exports = apiRouter;
