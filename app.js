// app.js
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const db = require("./db/queries");
const { body, validationResult } = require("express-validator");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let allMessages = await db.getAllMessages();
  res.render("index", { messages: allMessages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post(
  "/new",
  [
    body("author")
      .trim()
      .notEmpty()
      .withMessage("Author is required")
      .isLength({ max: 30 })
      .withMessage("Author must be 30 characters or fewer"),

    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ max: 500 })
      .withMessage("Message must be 500 characters or fewer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    await db.createMessage(req.body.author, req.body.message);
    res.redirect("/");
  },
);

//ending
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});
