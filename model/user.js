const { Schema, model } = require("mongoose");

const emailReqexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: 8,
    },
    email: {
      type: String,
      match: emailReqexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: '',
    }
  },
  { versionKey: false, timestamps: true }
);

const User = model("User", userSchema);


module.exports = User;