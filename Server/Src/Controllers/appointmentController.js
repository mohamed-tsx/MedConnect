const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

const AddAppointment = asyncHandler(async (req, res) => {
  const patientId = req.user.id;
  const doctorId = req.params.id;

  const doctor = await Prisma.doctor.findUnique({ where: { id: doctorId } });

  const hospitalId = doctor.hospitalId;

  const appointment = await Prisma.appointment.create({
    data: {
      patientId,
      doctorId,
      hospitalId,
    },
  });
  res
    .status(201)
    .json({ message: "Appointment created successfully", appointment });
});

const allRecentAppointments = asyncHandler(async (req, res) => {
  const hospitalId = req.user.id;
  const appointments = await Prisma.appointment.findMany({
    where: { hospitalId },
    include: { Doctor: true, User: true },
  });
  res.status(200).json(appointments);
});

const patientAppointments = asyncHandler(async (req, res) => {
  const patientId = req.user.id;
  const appointments = await Prisma.appointment.findMany({
    where: { patientId },
    include: { Doctor: true },
  });
  if (!appointments) {
    res.status(404);
    throw new Error("No appointments");
  }
  res.status(200).json({ success: true, appointments });
});

const getAllAppointMentsForDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  const hospitalId = req.user.id;
  const appointtments = await Prisma.appointment.findMany({
    where: { doctorId, hospitalId },
    include: { User: true },
  });
  if (!appointtments) {
    res.status(404);
    throw new Error("There's no appointments for this doctor");
  }
  res.status(200).json({ success: true, appointtments });
});
module.exports = {
  AddAppointment,
  allRecentAppointments,
  patientAppointments,
  getAllAppointMentsForDoctor,
};
