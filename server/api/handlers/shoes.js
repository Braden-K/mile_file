import { getShoesByUserIdQuery, createShoeQuery } from "../sql/shoeQueries.js";

const getShoesByUserId = async (req, reply) => {
  try {
    const { id } = req.params;
    const shoes = await client.query(getShoesByUserIdQuery, [id]);
    reply.send(shoes.rows);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send("Server error in getShoesByUserId handler");
  }
};

const createShoe = async (req, reply) => {
  try {
    const { id } = req.params;
    const { name, miles } = req.body;
    await client.query(createShoeQuery, [Number(id), name, Number(miles)]);
    reply.status(201);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send({ message: "Server error in createShoe handler" });
  }
};

export { getShoesByUserId, createShoe };
