const express = require("express");
const {
  AddAppointment,
  allRecentAppointments,
} = require("../Controllers/appointmentController");
const { isHospital } = require("../Utils/userRoleVerifyer");
const Verify = require("../Utils/verify");
const router = express.Router();
router.get("/addAppointment/:id", Verify, AddAppointment);
router.get("/recentAppointments/", Verify, isHospital, allRecentAppointments);

module.exports = router;
