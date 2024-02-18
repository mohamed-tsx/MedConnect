import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new Error("Forbidden");
    }

    req.user = user;
    next();
  });
};
