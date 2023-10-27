import {
  getRunsByUserId,
  getRunById,
  createRun,
  updateRun,
  updateRunNotes,
  deleteRun,
} from "../handlers/runs.js";

const runRoutes = async (fastify, options) => {
  fastify.get("/runs/user/:id", getRunsByUserId);
  fastify.get("/runs/:id", getRunById);
  fastify.post("/runs/:id", createRun);
  fastify.put("/runs/:id", updateRun);
  fastify.put("/runs/:id/notes", updateRunNotes);
  fastify.delete("/runs/:id", deleteRun);
};

export default runRoutes;
