const express = require('express');
const { add, remove, getDaily } = require('../controllers/daily');
const { authenticate, isValidId } = require('../middlewares');

const dailyRouter = express.Router();

dailyRouter.post('/', authenticate, add);

dailyRouter.delete("/:productId", authenticate, isValidId, remove);

dailyRouter.get("/:productDate", authenticate, getDaily);

module.exports = dailyRouter;