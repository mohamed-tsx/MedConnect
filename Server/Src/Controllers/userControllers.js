const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Prisma = require("../Config/Prisma");

const Register = asyncHandler(async (req, res) => {
  //Fetch data from the request body
  const { username, email, password } = req.body;

  //Check if the data is valid and throw an error if it is not valid
  if (!email || !password || !username) {
    res.status(403);
    throw new Error("Please provide all the required fields");
  }

  //Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(403);
    throw new Error("Invalid email address");
  }

  // Check if a user with the same email already exists
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If the user already exists then throw an error
  if (user) {
    res.status(403);
    throw new Error("User already exists");
  }

  // If user doesn't exist then start the process of creating new user and hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create new user with hashed password
  const newUser = await Prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  //Return new user with success response
  res.status(200).json({
    message: "User created successfully",
    newUser,
  });
});

module.exports = {
  Register,
};
