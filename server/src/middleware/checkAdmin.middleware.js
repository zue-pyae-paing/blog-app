import createError from "http-errors";

const isAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    return next(createError.Unauthorized("Admin access required"));
  }

  next();
};

export default isAdmin;
