const express = require("express");
const {
  create,
  allDoctorOfThisHospital,
} = require("../Controllers/doctorsController");
const Verify = require("../Utils/verify");
const { isHospital } = require("../Utils/userRoleVerifyer");
const router = express.Router();

router.post("/createDoctorProfile", Verify, isHospital, create);
router.get("/thedoctors", Verify, isHospital, allDoctorOfThisHospital);

module.exports = router;
