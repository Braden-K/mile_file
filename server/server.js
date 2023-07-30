import Fastify from "fastify";
import authRoutes from "./api/routes/authRoutes.js";
import userRoutes from "./api/routes/userRoutes.js";
import runRoutes from "./api/routes/runRoutes.js";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

fastify.addHook("authorizeUser", authorizeUser);

fastify.register(cors, {
  origin: "*",
});

fastify.register(authRoutes);
fastify.register(userRoutes);
fastify.register(runRoutes);

fastify.listen({ port: 5000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
