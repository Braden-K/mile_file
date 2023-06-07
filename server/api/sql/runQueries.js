const getRunsByUserIdQuery = "SELECT * FROM runs WHERE user_id = $1";
const getRunByIdQuery = "SELECT * FROM runs WHERE id = $1";
const createRunQuery =
  "INSERT INTO runs (user_id, distance, duration, avg_hr, description, intensity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const updateRunQuery =
  "UPDATE runs SET user_id = $1, distance = $2, duration = $3, avg_hr = $4, description = $5, intensity = $6 WHERE id = $7";
const deleteRunQuery = "DELETE FROM runs WHERE id = $1";

export {
  getRunsByUserIdQuery,
  getRunByIdQuery,
  createRunQuery,
  updateRunQuery,
  deleteRunQuery,
};
