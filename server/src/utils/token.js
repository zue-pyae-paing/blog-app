import jwt from "jsonwebtoken";

export const generateAcceptToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

export const genetateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
