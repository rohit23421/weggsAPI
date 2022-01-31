const mongoose = require("mongoose");
// const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [40, "Name should be under 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
    },
    number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "minimum 8 characters required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
