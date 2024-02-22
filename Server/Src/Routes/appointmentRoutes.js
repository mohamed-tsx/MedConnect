const express = require("express");
const {
  AddAppointment,
  allRecentAppointments,
  patientAppointments,
  getAllAppointMentsForDoctor,
} = require("../Controllers/appointmentController");
const { isHospital, isPatient } = require("../Utils/userRoleVerifyer");
const Verify = require("../Utils/verify");
const router = express.Router();
router.get("/addAppointment/:id", Verify, AddAppointment);
router.get("/recentAppointments/", Verify, isHospital, allRecentAppointments);
router.get("/patientAppointments/", Verify, isPatient, patientAppointments);
router.get(
  "/doctorAppointments/:id",
  Verify,
  isHospital,
  getAllAppointMentsForDoctor
);

module.exports = router;
