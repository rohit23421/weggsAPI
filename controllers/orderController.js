const Order = require("../models/order");
const User = require("../models/user");

//CREATE ORDER
exports.createOrder = async (req, res) => {
  // const newOrder = new Order(req.body);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  try {
    const savedOrder = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      taxAmount,
      shippingAmount,
      totalAmount,
      user: req.user._id,
    });
    // console.log(req.user._id);
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

//GET SINGLE ORDER BY ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR FROM GET SINGLE ORDER",
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

//GET ALL ORDERS FOR PARTICULAR USER
exports.getAllOrdersByUser = async (req, res) => {
  //get the user from params for matching with Orders users id
  const user = req.params.id;
  console.log(user);
  try {
    const orders = await Order.find({ user: user });
    // console.log(orders);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING ALL ORDERS BY USER from getAllOrdersByUser",
      error,
    });
  }
};

//GET ONE ORDER FOR USER(ONLY ORDERED BY HIM/HER)
exports.getOneOrderByUser = async (req, res) => {
  //get the user from params for matching with Orders users id
  const user = req.params.id;
  const orderid = req.params.orderId;
  console.log(user);
  console.log(orderid);
  try {
    const orders = await Order.findOne({ user: user, _id: orderid });
    // console.log(orders);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING ALL ORDERS BY USER from getAllOrdersByUser",
      error,
    });
  }
};
