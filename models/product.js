const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      requried: true,
      trim: true,
      maxlength: 2000,
    },
    photo: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    categories: {
      type: Array,
    },
    stock: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
