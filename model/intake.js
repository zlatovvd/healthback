const { Schema, model } = require("mongoose");

intakeSchema = new Schema(
  {
    typeblood: {
      type: Number,
      required: [true, "typeblood is required"],
    },
    height: {
      type: Number,
      required: [true, "height is required"],
      min: 100,
      max: 230,
    },
    age: {
      type: Number,
      requirred: [true, "age is required"],
      max: 120,
    },
    cweight: {
      type: Number,
      required: [true, "Current weight is rrequired"],
      min: 50,
      max: 600,
    },
    dweight: {
      type: Number,
      required: [true, "Desired weight is required"],
      min: 50,
      max: 150,
    },
        intake: {
            type: Number,
            required: true,
        },
    notproducts: Array,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Intake = model("Intake", intakeSchema);

module.exports = Intake;
