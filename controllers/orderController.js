const Order = require("../models/order");

//CREATE ORDER
exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      savedOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR CREATING ORDER",
      error,
    });
  }
};

//UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN UPDATING ORDER",
      error,
    });
  }
};

//DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "ORDER DELETED SUCCESSFULLY",
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN DELETING ORDER",
      error,
    });
  }
};

//GET ORDERS ONLY FOR PARTICULAR USER
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR FROM GET USER ORDER",
    });
  }
};

//GET ALL ORDER FOR ADMIN
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR FROM GET ALL ORDER FOR ADMIN",
      error,
    });
  }
};
