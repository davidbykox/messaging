async function getBookById(req, res) {
  const { bookId } = req.params;
  res.send(`Book ID: ${bookId}`);
}

module.exports = { getBookById };
