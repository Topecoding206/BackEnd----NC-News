const express = require("express");
const apiRouters = require("./routers/apiRouter");
const cors = require("cors");
const {
  handlePathError,
  customError,
  handleError404,
} = require("./errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRouters);
app.all("/*", handlePathError);
app.use(customError);
app.use(handleError404);

module.exports = app;
