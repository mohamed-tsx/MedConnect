const express = require("express");
const { Register, Login } = require("../Controllers/userControllers");
const router = express.Router();

router.post("/users/", Register);
router.post("/users/login", Login);

module.exports = router;
