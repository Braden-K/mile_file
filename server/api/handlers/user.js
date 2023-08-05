import client from "../../db.js";
import {
  getUsersQuery,
  createUsersQuery,
  getUserByIdQuery,
  getUserByEmailQuery,
} from "../sql/userQueries.js";

const getUsers = async (request, reply) => {
  try {
    console.log("in get users");
    const users = await client.query(getUsersQuery);
    reply.send(users.rows);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send("Server error");
  }
};

const getUserById = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await client.query(getUserByIdQuery, [id]);
    reply.send(user.rows[0]);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send("Server error");
  }
};

const getUserByEmail = async (request, reply) => {
  try {
    const { email } = request.params;
    const user = await client.query(getUserByEmailQuery, [email]);
    reply.send(user.rows[0]);
  } catch (err) {
    console.error(err.stack);
    reply.status(500).send("Server error");
  }
};

const createUser = async (request, reply) => {
  try {
    console.log("body is", request.body);
    const { email, name } = JSON.parse(request.body);
    await client.query(createUsersQuery, [email, name]);
    reply.status(201).send({ message: "User created" });
  } catch {
    reply.status(500).send({ message: "Server error" });
  }
};

export { getUsers, createUser, getUserById, getUserByEmail };
