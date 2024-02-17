const express = require("express");
const { Register, Login, Signout } = require("../Controllers/userControllers");
const router = express.Router();

router.post("/users/", Register);
router.post("/users/login", Login);
router.get("/users/signout", Signout);

module.exports = router;
