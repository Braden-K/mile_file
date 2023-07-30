import { login, logout, refresh } from "../handlers/auth.js";

const authRoutes = async (fastify, options) => {
  fastify.post("/auth/login", login);
  fastify.delete("/auth/logout", logout);
  fastify.post("/auth/refresh", refresh);
};

export default authRoutes;
