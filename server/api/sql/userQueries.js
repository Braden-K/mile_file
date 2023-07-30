const getUsersQuery = "SELECT * FROM users";
const createUsersQuery =
  "INSERT INTO users (username, password, firstname) VALUES ($1, $2, $3) RETURNING *";
const getUserByIdQuery = "SELECT * FROM users WHERE id = $1";
const postAccessTokenQuery = "INSERT INTO users (accessToken) VALUES ($1)";
const postRefreshTokenQuery = "INSERT INTO users (refreshToken) VALUES ($1)";
const deleteAccessTokenQuery = "DELETE FROM users WHERE accessToken = $1";
const deleteRefreshTokenQuery = "DELETE FROM users WHERE refreshToken = $1";
const getRefreshTokenByUserIdQuery =
  "SELECT (refreshToken) FROM users WHERE id = $1";

export {
  getUsersQuery,
  createUsersQuery,
  getUserByIdQuery,
  postAccessTokenQuery,
  postRefreshTokenQuery,
  deleteAccessTokenQuery,
  deleteRefreshTokenQuery,
  getRefreshTokenByUserIdQuery,
};
