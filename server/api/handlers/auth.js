import client from "../../db.js";
import jwt from "jsonwebtoken";
import {
  getUsersQuery,
  postAccessTokenQuery,
  postRefreshTokenQuery,
  deleteRefreshTokenQuery,
} from "../sql/userQueries.js";
import dotenv from "dotenv";
import { configDotenv } from "dotenv";

dotenv.config();
dotenv.configDotenv();

const login = async (req, reply) => {
  const body = JSON.parse(req.body);
  const users = await client.query(getUsersQuery);

  if (users) {
    const user = users.rows.find((user) => user.username === body.username);

    if (user && user.password === body.password) {
      const accessToken = generateAccessToken({
        id: user.id,
        firstname: user.firstname,
        username: user.username,
      });
      console.log("access token", accessToken);
      const refreshToken = jwt.sign(
        user,
        "6423ac6b6bc8ea0bcfc1beb20b6679cccf126ac8dae70b21d12b7aa3c9625be5d17827e822028283949f6c94b91bc7678ede5a6acd133275c191e15a4ca92d82",
        {
          expiresIn: "7d",
        }
      );
      await client.query(postAccessTokenQuery, [accessToken]);
      await client.query(postRefreshTokenQuery, [refreshToken]);
      reply.type("application/json");
      reply.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: user.username,
        firstname: user.firstname,
        id: user.id,
      });
    } else if (user) {
      reply.send({ message: "Wrong password" });
      console.log("Wrong password");
    } else {
      reply.send({ message: "User not found" });
      console.log("User not found");
    }
  } else {
    reply.send({ message: "No users found" });
    throw new Error("No users found");
  }
};

const logout = async (req, reply) => {
  await client.query(deleteRefreshTokenQuery, [req.body.token]);
};

const refresh = async (req, reply) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return reply.sendStatus(401);

  const refreshTokenOfUserId = await client.query(
    getRefreshTokenByUserIdQuery,
    [req.user.id]
  );

  if (refreshToken !== refreshTokenOfUserId) return reply.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return reply.sendStatus(403);
      const accessToken = generateAccessToken({
        id: user.id,
        firstname: user.firstname,
        username: user.username,
      });
      reply.send({ accessToken: accessToken });
    }
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    user,
    "40f3fb9b1bcdd4cb184486e2c5151cd60aa3e6c982422d0b5d590df36ed038b8fc092226f1d685fe0a4442dba264c51ddca4339fe910fcbe754fd13d87b871ac",
    { expiresIn: "15m" }
  );
};

export { login, logout, refresh };
