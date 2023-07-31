import client from "../../db.js";
import jwt from "jsonwebtoken";
import {
  postAccessTokenQuery,
  postRefreshTokenQuery,
  deleteRefreshTokenQuery,
} from "../sql/userQueries.js";

const login = async (req, reply) => {
  console.log("login", req.body);
  const users = await client.query(getUsersQuery);

  if (users) {
    const user = users.find((user) => user.username === req.username);

    if (user && user.password === req.password) {
      const { firstname, id } = user;
      const accessToken = generateAccessToken(user);
      console.log("access token", accessToken);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      await client.query(postAccessTokenQuery, [accessToken]);
      await client.query(postRefreshTokenQuery, [refreshToken]);
      reply.send({ accessToken, refreshToken, firstname, id });
    } else if (user) {
      console.log("Wrong password");
    } else {
      console.log("User not found");
    }
  } else {
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
      const accessToken = generateAccessToken({ name: user.name });
      reply.send({ accessToken });
    }
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export { login, logout, refresh };
