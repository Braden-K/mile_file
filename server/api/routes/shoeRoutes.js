import { getShoesByUserId, createShoe, updateShoe } from "../handlers/shoes.js";

const shoeRoutes = async (fastify, options) => {
  fastify.get("/shoes/:id", getShoesByUserId);
  fastify.post("/shoes/:id", createShoe);
  fastify.put("/shoes/:shoe_id", updateShoe);
};

export default shoeRoutes;
