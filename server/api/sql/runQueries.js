const getRunsByUserIdQuery = "SELECT * FROM runs WHERE user_id = $1";
const getRunByIdQuery = "SELECT * FROM runs WHERE id = $1";
const createRunQuery =
  "INSERT INTO runs (user_id, distance, duration, avg_hr, description, intensity, type) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const updateRunQuery =
  "UPDATE runs SET user_id = $1, distance = $2, duration = $3, avg_hr = $4, description = $5, intensity = $6 WHERE id = $7";
const updateRunNotesQuery = "UPDATE runs SET description = $1 WHERE id = $2";
const deleteRunQuery = "DELETE FROM runs WHERE id = $1";

export {
  getRunsByUserIdQuery,
  getRunByIdQuery,
  createRunQuery,
  updateRunQuery,
  updateRunNotesQuery,
  deleteRunQuery,
};
