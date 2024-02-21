const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Src/Routes/userRoutes");
const doctorRoutes = require("./Src/Routes/doctorRoutes");
const errorMiddleWare = require("./Src/Middlewares/errorMiddleware");
const appointmentRoutes = require("./Src/Routes/appointmentRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT;
const server = express();

server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser({}));

server.use("/api/", userRoutes);
server.use("/api/doctors/", doctorRoutes);
server.use("/api/appointment/", appointmentRoutes);
server.use(errorMiddleWare);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
