const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Src/Routes/userRoutes");
const errorMiddleWare = require("./Src/Middlewares/errorMiddleware");
dotenv.config();

const PORT = process.env.PORT;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", userRoutes);
server.use(errorMiddleWare);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
