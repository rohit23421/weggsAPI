const mongoose = require("mongoose");

const whereToBuySchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, "Please provide a location"],
      trim: true,
      maxlength: 32,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
    },
    // photos: {
    //   type: String,
    // },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhereToBuy", whereToBuySchema);
