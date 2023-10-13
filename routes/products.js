const express = require('express');
const {
  getByName,
  getIntake,
  saveIntake,
  updateIntake,
  getProducts,
  getNotRecommended,
} = require("../controllers/products");
const authenticate = require('../middlewares/authenticate');

const productsRouter = express.Router();

productsRouter.get('/search/:product', getByName);

productsRouter.get('/', getProducts);

productsRouter.get('/intake', authenticate, getIntake);

productsRouter.get('/intake/:typeblood', getNotRecommended);

productsRouter.post('/intake', authenticate, saveIntake);

productsRouter.put('/intake', authenticate, updateIntake);

module.exports = productsRouter;