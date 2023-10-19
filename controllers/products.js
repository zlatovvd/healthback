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
  console.log(typeblood);
  const filter={};

  switch (typeblood) {
    case 1 : 
      filter = {'groupBloodNotAllowed.1':true};
      break;
    case 2 :
      filter = {'groupBloodNotAllowed.2':true};
      break;
    case 3 :
      filter = {'groupBloodNotAllowed.3':true};
      break;
    case 4 :
      filter = {'groupBloodNotAllowed.4':true};
      break;    
  }
  
  const products = await Product.find(filter);

  const notRecommended = [];

  if (products) {
    products.map(item => {
         
      if (
        item.groupBloodNotAllowed[typeblood] === true &&
        !notRecommended.includes(item.categories[0])
      ) {
        notRecommended.push(item.categories[0]);
      }
    });
  }

  return res.json(notRecommended);

}

const getIntake = async (req, res) => {
  const { _id: owner } = req.user;

  console.log('owner', owner);

  const result = await Intake.findOne({ owner });
  console.log('result', result);
 // if (!result) {
  //  console.log('error 404 no');
   // throw HttpError(404, "Not found");
    // result = {
    //   height: '0',
    //   age: '0',
    //   cweight: '0',
    //   dweight: '0',
    //   typeblood: 1,
    // }
  //}

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

  console.log('result', result);

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
