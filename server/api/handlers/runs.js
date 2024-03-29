import client from "../../db.js";
import {
  getRunsByUserIdQuery,
  createRunQuery,
  getRunByIdQuery,
  updateRunQuery,
  updateRunNotesQuery,
  deleteRunQuery,
} from "../sql/runQueries.js";

const getRunsByUserId = async (req, reply) => {
  try {
    const { id } = req.params;
    const runs = await client.query(getRunsByUserIdQuery, [id]);
    reply.send(runs.rows);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send("Server error in getRunsByUserId handler");
  }
};

const getRunById = async (req, reply) => {
  try {
    const { id } = req.params;
    const run = await client.query(getRunByIdQuery, [id]);
    reply.send(run.rows[0]);
  } catch (err) {
    console.log(err.stack);
    reply.status(500).send("Server error in getRunById handler");
  }
};

const createRun = async (req, reply) => {
  try {
    const { id } = req.params;
    const { distance, duration, heartRate, description, shoe_id, type } =
      req.body;
    await client.query(createRunQuery, [
      id,
      distance,
      duration,
      heartRate,
      description,
      shoe_id,
      type,
    ]);

    reply.status(201);
  } catch {
    reply.status(500);
  }
};

const updateRun = async (req, reply) => {
  try {
    console.log("uipdaste run hanlder and here is reqbocy", req.body);
    const { id } = req.params;
    const { user_id, distance, duration, avg_hr, description, shoe_id, date } =
      req.body;
    await client.query(updateRunQuery, [
      user_id,
      distance,
      duration,
      avg_hr,
      description,
      shoe_id,
      date,
      id,
    ]);
    reply.status(201).send({ message: "Run updated" });
  } catch (err) {
    console.log(err.stack);
    reply.status(500).send({ message: "Server error in updateRun handler" });
  }
};

const updateRunNotes = async (req, reply) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await client.query(updateRunNotesQuery, [description, id]);
    reply.status(201);
  } catch (err) {
    console.log(err.stack);
    reply.status(500).send("Server error");
  }
};

const deleteRun = async (req, reply) => {
  try {
    const { id } = req.params;
    await client.query(deleteRunQuery, [id]);
    reply.status(201).send("Run deleted");
  } catch (err) {
    console.log(err.stack);
    reply.status(500).send("Server error");
  }
};

export {
  getRunsByUserId,
  getRunById,
  createRun,
  updateRun,
  updateRunNotes,
  deleteRun,
};
