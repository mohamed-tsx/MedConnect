const create = (req, res) => {
  //Fetch the doctor information from the request body
  const { name, avatar, specialization, description } = req.body;
  const hospitalId = req.user.id;

  //Validation
  if (!(name && specialization && description)) {
    res.status(403);
    throw new Error("Please fill all the required fields");
  }

  res.status(200).json({
    name,
    avatar,
    description,
    hospitalId,
    specialization,
  });
};

module.exports = {
  create,
};
