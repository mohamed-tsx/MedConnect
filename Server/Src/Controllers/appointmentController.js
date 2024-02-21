const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

const AddAppointment = asyncHandler(async (req, res) => {
  const { description } = req.body;
  const patientId = req.user.id;
  const doctorId = req.params.id;
  console.log(doctorId, patientId);

  const appointment = await Prisma.appointment.create({
    data: {
      patientId,
      doctorId,
      description,
    },
  });
  res
    .status(201)
    .json({ message: "Appointment created successfully", appointment });
});
module.exports = {
  AddAppointment,
};
