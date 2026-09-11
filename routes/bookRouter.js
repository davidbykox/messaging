const { Router } = require("express");
const { getBookById } = require("../controllers/bookController");

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", getBookById);
bookRouter.post("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`Book ID: ${bookId} was reserved!`);
});
bookRouter.get("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`Here you can reserve Book ID: ${bookId}`);
});

module.exports = bookRouter;
