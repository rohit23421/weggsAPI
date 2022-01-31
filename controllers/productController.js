const Product = require("../models/product");
// const storage = require("../config/firebase");

//CREATE PRODUCT
exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json({
      success: true,
      savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN CREATING PRODUCT",
      error,
    });
  }
};

//UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      //get the product ID form the params
      req.params.id,
      {
        //update or set the found product id with the body
        $set: req.body,
      },
      //return the new saved collection
      { new: true }
    );
    return res.status(200).json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN UPDATING PRODUCT",
      error,
    });
  }
};

//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json("PRODUCT HAS BEEN DELETED SUCCESFULLY");
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN DELETING PRODUCT",
      error,
    });
  }
};

//GET PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING PRODUCT BY ID",
      error,
    });
  }
};

//GET ALL PRODUCT
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING ALL PRODUCTS",
      error,
    });
  }
};
