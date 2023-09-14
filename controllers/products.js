const { Product, Intake } = require("../model");
const { controllerWrapper, createIntake } = require("../helpers");

const getByName = async (req, res) => {
  const query = req.params.product;
  const products = await Product.find({ "title.ua": { $regex: query } });

  return res.json(products);
};

const getIntake = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Intake.findOne({ owner });
  console.log('result get', result);
  if (!result) {
    console.log('error 404');
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const saveIntake = async (req, res) => {
  const { typeblood, height, age, cweight, dweight } = req.body;

  const intake = createIntake(height, age, cweight, dweight);

  const queryName = `groupBloodNotAllowed.${typeblood}`;

  const notproducts = await Product.find({ [queryName]: true }).distinct(
    "categories"
  );

  const { _id: owner } = req.user;
  const result = await Intake.create({
    ...req.body,
    intake,
    notproducts,
    owner,
  });

    res.status(201).json(result);
};

const updateIntake = async (req, res) => {
  console.log("update", req.body);
  // const { typeblood, height, age, cweight, dweight, _id } = req.body;
  const { userId } = req.params;
 
  const result = await Intake.findByIdAndUpdate(
    userId, req.body, { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
 
};

module.exports = {
  getByName: controllerWrapper(getByName),
  getIntake: controllerWrapper(getIntake),
  saveIntake: controllerWrapper(saveIntake),
  updateIntake: controllerWrapper(updateIntake),
};
