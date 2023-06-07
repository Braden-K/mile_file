import { getUsers, createUser, getUserById } from "../handlers/user.js";

const userRoutes = async (fastify, options) => {
  fastify.get("/users", getUsers);
  fastify.get("/users/:id", getUserById);
  fastify.post("/users", createUser);
};

export default userRoutes;
