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
    include: { Appointments: true },
  });

  res.status(200).json(doctors);
});

const allHospitaLs = asyncHandler(async (req, res) => {
  const all = await Prisma.user.findMany({
    where: { role: "hospital" },
    include: { doctors: true },
  });

  res.status(200).json(all);
});

const allDoctorOfParticularHospital = asyncHandler(async (req, res) => {
  const { hospitalId } = req.query;

  const allHospitalDoctor = await Prisma.doctor.findMany({
    where: { hospitalId },
  });

  res.status(200).json({ success: true, doctors: allHospitalDoctor });
});

module.exports = {
  create,
  allDoctorOfThisHospital,
  allHospitaLs,
  allDoctorOfParticularHospital,
};
