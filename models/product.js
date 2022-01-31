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
    photos: {
      type: String,
    },
    // photos: [
    //   {
    //     id: {
    //       type: String,
    //       required: true,
    //     },
    //     secure_url: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
