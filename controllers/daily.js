const { DailyProduct } = require("../model");
const { controllerWrapper, HttpError } = require("../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await DailyProduct.create({ ...req.body, owner });

  res.status(201).json(result);
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
    const result = await DailyProduct.find({ date: productDate, owner });
    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
}

module.exports = { add: controllerWrapper(add), remove: controllerWrapper(remove), getDaily };
