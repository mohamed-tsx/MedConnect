const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Prisma = require("../Config/Prisma");
const jwt = require("jsonwebtoken");

// @description Register new user
// @Method POST
// @Route /user/
// @Access Public
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

  const { password: pass, ...rest } = newUser;

  //Return new user with success response
  res.status(200).json({
    message: "User created successfully",
    rest,
  });
});

// @description Register new user
// @Method POST
// @Route /user/login/
// @Access Public
const Login = asyncHandler(async (req, res) => {
  //Fetch data from the request body
  const { email, password } = req.body;

  //Check if the data is valid and throw an error if it is not valid
  if (!(email && password)) {
    res.status(403);
    throw new Error("Please fill all the required fields");
  }

  // Check if the email is valid
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

  // If the user doesn't exists then throw an error
  if (!user) {
    res.status(403);
    throw new Error("User doesn't exists");
  }

  // Else if the user exists check if the user password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // Check if the password is incorrect
  if (!isPasswordCorrect) {
    res.status(403);
    throw new Error("Invalid Credentials");
  }

  //Generate the token
  const token = generateToken(user.id, user.email);

  const { password: pass, ...rest } = user;
  console.log(rest);

  //If the password is correct log in the user and return success response
  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    message: "User logged in successfully",
    rest,
  });
});

const generateToken = (id) => {
  const payload = { id };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};
module.exports = {
  Register,
  Login,
};
