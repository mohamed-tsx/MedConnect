const express = require("express");
const { AddAppointment } = require("../Controllers/appointmentController");
const Verify = require("../Utils/verify");
const router = express.Router();
router.get("/addAppointment/:id", Verify, AddAppointment);

module.exports = router;
