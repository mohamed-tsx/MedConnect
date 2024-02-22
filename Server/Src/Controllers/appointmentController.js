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
module.exports = {
  AddAppointment,
  allRecentAppointments,
};
