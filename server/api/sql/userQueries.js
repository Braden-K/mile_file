const getUsersQuery = "SELECT * FROM users";
const createUsersQuery =
  "INSERT INTO users (username, password, firstname) VALUES ($1, $2, $3) RETURNING *";
const getUserByIdQuery = "SELECT * FROM users WHERE id = $1";
const postAccessTokenQuery = `INSERT INTO users accesstoken VALUES ($1)`;
const postRefreshTokenQuery = `INSERT INTO users refreshtoken VALUES ($1)`;
const deleteAccessTokenQuery = `DELETE FROM users WHERE accesstoken = $1`;
const deleteRefreshTokenQuery = `DELETE FROM users WHERE refreshtoken = $1`;
const getRefreshTokenByUserIdQuery =
  "SELECT refreshtoken FROM users WHERE id = $1";

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
