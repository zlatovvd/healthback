const { Product, Intake } = require("../model");
const { controllerWrapper, createIntake, HttpError } = require("../helpers");

const getProducts = async (req, res) => {
  const products = await Product.find();
  
  if(!products) {
    throw HttpError(404, "Not found");
  }
  return res.json(products);
}

const getByBlood = async (req, res) => {
  const products = await Product.distinct(3)
}

const getByName = async (req, res) => {
  const query = req.params.product;
  const products = await Product.find({ "title.ua": { $regex: query } });
  return res.json(products);
};

const getNotRecommended = async (req, res) => {

  const typeblood = req.params.typeblood;
  const queryName = `groupBloodNotAllowed.${typeblood}`;
  const notRecommended = await Product.find({ [queryName]: true }).distinct(
    "categories"
  );

  return res.json(notRecommended);

}

const getIntake = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Intake.findOne({ owner });

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

  const {_id:owner} = req.user;

  const {typeblood} = req.body;

  const queryName = `groupBloodNotAllowed.${typeblood}`;

  const notproducts = await Product.find({ [queryName]: true }).distinct(
    "categories"
  );

  const result = await Intake.findOneAndUpdate(
    {owner}, {...req.body, notproducts}, { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
 
};

module.exports = {
  getProducts: controllerWrapper(getProducts),
  getByName: controllerWrapper(getByName),
  getNotRecommended: controllerWrapper(getNotRecommended),
  getIntake: controllerWrapper(getIntake),
  saveIntake: controllerWrapper(saveIntake),
  updateIntake: controllerWrapper(updateIntake),
};
