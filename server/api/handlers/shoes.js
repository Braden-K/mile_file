import client from "../../db.js";
import {
  getShoesByUserIdQuery,
  createShoeQuery,
  updateShoeQuery,
} from "../sql/shoeQueries.js";

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
    await client.query(createShoeQuery, [id, name, miles]);
    reply.status(201);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send({ message: "Server error in createShoe handler" });
  }
};

const updateShoe = async (req, reply) => {
  try {
    const { shoe_id } = req.params;
    const { miles } = req.body;
    await client.query(updateShoeQuery, [shoe_id, miles]);
    reply.status(200);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send({ message: "Server error in updateShoe handler" });
  }
};

export { getShoesByUserId, createShoe, updateShoe };
