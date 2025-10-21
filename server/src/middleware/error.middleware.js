const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const stack = process.env.NODE_ENV === "production" ? null : err.stack;
  res.status(statusCode).json({ message, stack });
  next();
};

export default errorMiddleware;
