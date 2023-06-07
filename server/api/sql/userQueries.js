const getUsersQuery = "SELECT * FROM users";
const createUsersQuery =
  "INSERT INTO users (username, password, firstname) VALUES ($1, $2, $3) RETURNING *";
const getUserByIdQuery = "SELECT * FROM users WHERE id = $1";

export { getUsersQuery, createUsersQuery, getUserByIdQuery };
