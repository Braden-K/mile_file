const getShoesByUserIdQuery = "SELECT * FROM shoes WHERE user_id = $1";
const createShoeQuery =
  "INSERT INTO shoes (user_id, shoe_name, miles) VALUES ($1, $2, $3)";
const updateShoeQuery = "UPDATE shoes SET miles = $2 WHERE id = $1";

export { getShoesByUserIdQuery, createShoeQuery, updateShoeQuery };
