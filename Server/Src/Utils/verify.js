const jwt = require("jsonwebtoken");
const Prisma = require("../Config/Prisma");
const asyncHandler = require("express-async-handler");

const Verify = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token)
    try {
      // Take the token from the headers
      token = req.cookies.token;

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user
      const user = await Prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        res.status(401);
        throw new Error("Authenticatin failed: User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Autherization failed: Invalid token");
    }
  if (!token) {
    res.status(401);
    throw new Error("Authorization failed: No token provided");
  }
});

module.exports = Verify;
