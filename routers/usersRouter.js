const usersRouter = require("express").Router();

const { getUser } = require("../controller");

usersRouter.route("/").get(getUser);

module.exports = usersRouter;
