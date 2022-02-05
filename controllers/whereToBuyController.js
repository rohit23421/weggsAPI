const WhereToBuy = require("../models/wheretobuy");

//CREATE WHERE-TO LOCATION
exports.createWhereTo = async (req, res) => {
  const newWhereTo = new WhereToBuy(req.body);
  try {
    const savedWhereTo = await newWhereTo.save();
    return res.status(200).json({
      success: true,
      savedWhereTo,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN CREATING WHERE-TO",
      error,
    });
  }
};

//UPDATE WHERE-TO LOCATION
exports.updateWhereTo = async (req, res) => {
  try {
    const updatedWhereTo = await WhereToBuy.findByIdAndUpdate(
      //get the whereto ID from the params
      req.params.id,
      {
        //update or set the found whereto id with the body
        $set: req.body,
      },
      //return the new saved collection
      { new: true }
    );
    return res.status(200).json({
      success: true,
      updatedWhereTo,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN UPDATING WHERE-TO",
      error,
    });
  }
};

//DELETE WHERE-TO LOCATION
exports.deleteWhereTo = async (req, res) => {
  try {
    await WhereToBuy.findByIdAndDelete(req.params.id);
    return res.status(200).json("WHERE-TO LOCATION DELETED SUCCESSFULLY");
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN DELETING WHERE-TO",
      error,
    });
  }
};

//GET WHERE-TO LOCATION
exports.getWhereTo = async (req, res) => {
  try {
    const WhereTo = await WhereToBuy.findById(req.params.id);
    return res.status(200).json({
      success: true,
      WhereTo,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING WHERE-TO BY ID",
      error,
    });
  }
};

//GET ALL WHERE-TO LOCATION
exports.getAllWhereTo = async (req, res) => {
  try {
    const WhereTos = await WhereToBuy.find();
    return res.status(200).json({
      success: true,
      WhereTos,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING ALL WHERE-TO'S",
      error,
    });
  }
};
