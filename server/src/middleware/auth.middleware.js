import createError from "http-errors";
import jwt from "jsonwebtoken";

const authMiddleware  = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError.Unauthorized("No token provided"));
  }


  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return next(createError.Unauthorized("Invalid token format"));
  }

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!user) {
      return next(createError.Unauthorized("Invalid token or expired"));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(createError.Unauthorized("Invalid or expired token"));
  }
};

export default authMiddleware ;
