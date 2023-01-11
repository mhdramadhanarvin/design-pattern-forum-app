/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool")

const ThreadsTableTestHelper = {
  async addThread({
    id = "thread-123", title = "dicoding", body = "Dicoding Indonesia", owner = "user-123"
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4)",
      values: [id, title, body, owner],
    }

    await pool.query(query)
  },

  async findThreadsById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable() {
    await pool.query("DELETE FROM users WHERE 1=1")
  },
}

module.exports = ThreadsTableTestHelper