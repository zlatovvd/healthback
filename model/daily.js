const { Schema, model } = require("mongoose");

const dailySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  callories: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
},
  {versionKey:false, timestamps:true}
);

const DailyProduct = model("DailyProduct", dailySchema);

module.exports = DailyProduct;
