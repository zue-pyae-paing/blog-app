import jwt from "jsonwebtoken";

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next(); // guest user
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
  } catch (err) {
    req.user = null; // invalid token => treat as guest
  }

  next();
};

export default optionalAuthMiddleware;
