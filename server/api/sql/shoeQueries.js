const getShoesByUserIdQuery = "SELECT * FROM shoes WHERE user_id = $1";
const createShoeQuery =
  "INSERT INTO shoes (user_id, shoe_name, miles, date) VALUES ($1, $2, $3, NOW())";

export { getShoesByUserIdQuery, createShoeQuery };
