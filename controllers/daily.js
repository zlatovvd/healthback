const { DailyProduct } = require("../model");
const { controllerWrapper, HttpError } = require("../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const {name, weight} = req.body;
  
  const dailyProduct = await DailyProduct.findOne({name})
  
  if (dailyProduct) {
    await DailyProduct.findByIdAndUpdate(dailyProduct._id, {weight: dailyProduct.weight + Number(weight)});
    const resUpdate = await DailyProduct.findOne({_id: dailyProduct._id})
    return res.json(resUpdate);
  } else {
    const result = await DailyProduct.create({ ...req.body, owner });
    res.status(201).json(result);
  }
  
};

const remove = async (req, res) => {
    const { productId } = req.params;
    
    const result = await DailyProduct.findByIdAndRemove(productId);

    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
}

const getDaily = async (req, res) => {
    const { productDate } = req.params;
    const { _id: owner } = req.user;
    const result = await DailyProduct.find({ date: {$eq: new Date(productDate)}, owner });

    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
}

module.exports = { add: controllerWrapper(add), remove: controllerWrapper(remove), getDaily };
