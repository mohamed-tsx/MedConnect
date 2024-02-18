const express = require("express");
const { create } = require("../Controllers/doctorsController");
const Verify = require("../Utils/verify");
const router = express.Router();

router.post("/createDoctorProfile", Verify, create);

module.exports = router;
