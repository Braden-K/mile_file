import {
  getUsers,
  createUser,
  getUserById,
  getUserByEmail,
} from "../handlers/user.js";

const userRoutes = async (fastify, options) => {
  fastify.get("/users", getUsers);
  fastify.get("/users/:id", getUserById);
  fastify.get("/users/email/:email", getUserByEmail);
  fastify.post("/users", createUser);
};

export default userRoutes;
