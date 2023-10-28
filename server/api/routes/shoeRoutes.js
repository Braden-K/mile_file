import { getShoesByUserId, createShoe } from "../handlers/shoes.js";

const shoeRoutes = async (fastify, options) => {
  fastify.get("/shoes/:id", getShoesByUserId);
  fastify.post("/shoes/:id", createShoe);
};

export default shoeRoutes;
