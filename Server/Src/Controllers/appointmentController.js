const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

const AddAppointment = asyncHandler(async (req, res) => {
  const patientId = req.user.id;
  const doctorId = req.params.id;

  const appointment = await Prisma.appointment.create({
    data: {
      patientId,
      doctorId,
    },
  });
  res
    .status(201)
    .json({ message: "Appointment created successfully", appointment });
});
module.exports = {
  AddAppointment,
};
