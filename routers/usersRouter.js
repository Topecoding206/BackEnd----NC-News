const usersRouter = require("express").Router();

const { getUser, getUserById } = require("../controller");

usersRouter.route("/").get(getUser);
usersRouter.route("/:username").get(getUserById);

module.exports = usersRouter;
