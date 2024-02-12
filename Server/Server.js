const express = require("express");

const server = express();

server.listen(4321, () => {
  console.log("Server is running on port 4321");
});
