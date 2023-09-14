const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  categories: String,
  weight: Number,
  title: {
    ru: String,
    ua: String,
  },
  calories: Number,
  groupBloodNotAllowed: [Boolean],
});


const Product = model('Product', productSchema);

module.exports = Product;