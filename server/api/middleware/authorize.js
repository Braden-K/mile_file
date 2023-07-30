const authorizeUser = async (req, reply) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    reply.code(401).send({ message: "Unauthorized" });
  }
};

export default authorizeUser;
