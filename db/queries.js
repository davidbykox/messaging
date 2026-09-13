const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT *
    FROM messages
    ORDER BY created_at DESC
  `);

  return rows;
}

async function createMessage(username, message) {
  await pool.query(
    `
    INSERT INTO messages (username, message)
    VALUES ($1, $2)
    `,
    [username, message],
  );
}

module.exports = {
  getAllMessages,
  createMessage,
};
