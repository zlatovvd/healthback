const express = require('express');
const {
  getByName,
  getIntake,
  saveIntake,
  updateIntake,
} = require("../controllers/products");
const authenticate = require('../middlewares/authenticate');

const productsRouter = express.Router();

productsRouter.get('/search/:product', getByName);

productsRouter.get('/intake', authenticate, getIntake);

productsRouter.post('/intake', authenticate, saveIntake);

productsRouter.put('/intake/:userId', authenticate, updateIntake);

module.exports = productsRouter;