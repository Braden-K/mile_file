const getUsersQuery = "SELECT * FROM users";
const createUsersQuery = "INSERT INTO users (email, name) VALUES ($1, $2)";
const getUserByIdQuery = "SELECT * FROM users WHERE id = $1";
const getUserByEmailQuery = "SELECT * FROM users WHERE email = $1";

export {
  getUsersQuery,
  createUsersQuery,
  getUserByIdQuery,
  getUserByEmailQuery,
};
