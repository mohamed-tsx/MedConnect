const express = require("express");
const { create } = require("../Controllers/doctorsController");
const Verify = require("../Utils/verify");
const { isHospital } = require("../Utils/userRoleVerifyer");
const router = express.Router();

router.post("/createDoctorProfile", Verify, isHospital, create);

module.exports = router;
