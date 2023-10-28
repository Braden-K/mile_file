const getShoesByUserIdQuery = "SELECT * FROM shoes WHERE user_id = $1";
const createShoeQuery =
  "INSERT INTO shoes (user_id, shoe_name, miles) VALUES ($1, $2, $3)";

export { getShoesByUserIdQuery, createShoeQuery };
