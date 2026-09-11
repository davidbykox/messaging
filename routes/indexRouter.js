const { Router } = require("express");

const indexRouter = Router();

indexRouter.use((req, res) => res.send("Main page"));

module.exports = indexRouter;
