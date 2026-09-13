const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (message, username, created_at)
VALUES
  ('Hi there!', 'Amando'),
  ('Hello World!', 'Charles');
`;

async function main() {
  console.log("seeding...");

  await pool.query(SQL);

  await pool.end();

  console.log("done");
}

main();
