const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

const create = asyncHandler(async (req, res) => {
  //Fetch the doctor information from the request body
  const { name, avatar, specialization, description } = req.body;
  const hospitalId = req.user.id;

  //Validation
  if (!(name && specialization && description)) {
    res.status(403);
    throw new Error("Please fill all the required fields");
  }

  //Create the doctor
  const newDoctor = await Prisma.Doctor.create({
    data: {
      name,
      specialization,
      hospital: { connect: { id: hospitalId } },
      description,
      avatar,
    },
  });

  res.status(200).json({ newDoctor });
});

const allDoctorOfThisHospital = asyncHandler(async (req, res) => {
  const hospitalId = req.user.id;

  const doctors = await Prisma.doctor.findMany({
    where: { hospitalId },
  });

  res.status(200).json(doctors);
});

module.exports = {
  create,
  allDoctorOfThisHospital,
};
