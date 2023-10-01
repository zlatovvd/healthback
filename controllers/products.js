const { Product, Intake } = require("../model");
const { controllerWrapper, createIntake, HttpError } = require("../helpers");

const getProducts = async (req, res) => {
  const products = await Product.find();
  
  if(!products) {
    throw HttpError(404, "Not found");
  }
  return res.json(products);
}

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
    console.log('error 404 no');
    throw HttpError(404, "Not found");
    // result = {
    //   height: '0',
    //   age: '0',
    //   cweight: '0',
    //   dweight: '0',
    //   typeblood: 1,
    // }
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

  const { _id: id } = req.body;

  const result = await Intake.findByIdAndUpdate(
    id, req.body, { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
 
};

module.exports = {
  getProducts: controllerWrapper(getProducts),
  getByName: controllerWrapper(getByName),
  getIntake: controllerWrapper(getIntake),
  saveIntake: controllerWrapper(saveIntake),
  updateIntake: controllerWrapper(updateIntake),
};
