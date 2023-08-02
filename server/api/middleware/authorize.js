const authorizeUser = async (request, reply) => {
  if (request.path !== "/api/auth/login") {
    try {
      const authHeader = request.req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        throw new Error("No token provided");
      }

      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      request.req.user = decoded;
    } catch (error) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  }
};

export default authorizeUser;
