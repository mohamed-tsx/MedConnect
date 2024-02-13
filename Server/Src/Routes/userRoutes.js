const express = require("express");
const { Register } = require("../Controllers/userControllers");
const router = express.Router();

router.get("/users/", Register);

module.exports = router;
