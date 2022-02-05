const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const WhereToBuy = require("../models/wheretobuy");
const WhereClause = require("../middlewares/whereClause");

//GET TOTAL CUSTOMERS - DAY,WEEK,MONTH,YEAR
// exports.getTotalCustomersFilter = async (req, res) => {
//   try {
//     const totalCustomersFilter = await User.find({
//       createdAt: { $gte: "2022-01-29", $lte: "2022-01-30" }.exec(),
//     })
//       .res.status(200)
//       .json({
//         success: true,
//         totalCustomersFilter,
//       });
//   } catch (error) {
//     res.status(400).json({
//       message: "ERROR IN GETTING TOTAL CUSTOMERS BY FILTER",
//       error,
//     });
//   }
// };

//GET TOTAL CUSTOMERS COUNT FOR ALL TIME
exports.getTotalCustomersCount = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments().exec();
    res.status(200).json({
      success: true,
      totalCustomers,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL CUSTOMERS",
      error,
    });
  }
};

//GET TOTAL USERS WITH PAGINATION
exports.getTotalCustomersPagination = async (req, res) => {
  const limit = req.query.limit;

  try {
    const totalCustCount = await User.countDocuments();

    const usersObj = new WhereClause(User.find(), req.query).search().filter();

    let users = await usersObj.base;
    const filteredUserNumber = users.length;

    usersObj.pager(limit);
    users = await usersObj.base.clone();

    res.status(200).json({
      success: true,
      users,
      filteredUserNumber,
      totalCustCount,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL CUSTOMERS FROM PAGINATION",
      error,
    });
  }
};

//GET TOTAL ORDERS WITH PAGINATION
exports.getAllOrdersPagination = async (req, res) => {
  const limit = 3 || req.query.limit;

  try {
    const totalOrderCount = await Order.countDocuments();

    const ordersObj = new WhereClause(Order.find(), req.query)
      .search()
      .filter();

    let orders = await ordersObj.base;
    const filteredOrderNumber = orders.length;

    ordersObj.pager(limit);
    orders = await ordersObj.base.clone();

    res.status(200).json({
      success: true,
      orders,
      filteredOrderNumber,
      totalOrderCount,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL ORDERS FROM PAGINATION",
      error,
    });
  }
};

//GET TOTAL PRODUCTS WITH PAGINATION
exports.getAllProductsPagination = async (req, res) => {
  const limit = 3 || req.query.limit;

  try {
    const totalProductCount = await Product.countDocuments();

    const productsObj = new WhereClause(Product.find(), req.query)
      .search()
      .filter();

    let products = await productsObj.base;
    const filteredProductNumber = products.length;

    productsObj.pager(limit);
    products = await productsObj.base.clone();

    res.status(200).json({
      success: true,
      products,
      filteredProductNumber,
      totalProductCount,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL PRODUCTS FROM PAGINATION",
      error,
    });
  }
};

//GET TOTAL WHERE-TO'S WITH PAGINATION
exports.getAllWhereTosPagination = async (req, res) => {
  const limit = 3 || req.query.limit;

  try {
    const totalWhereToCount = await WhereToBuy.countDocuments();

    const wheretosObj = new WhereClause(WhereToBuy.find(), req.query)
      .search()
      .filter();

    let wheretos = await wheretosObj.base;
    const filteredWhereToNumber = wheretos.length;

    wheretosObj.pager(limit);
    wheretos = await wheretosObj.base.clone();

    res.status(200).json({
      success: true,
      wheretos,
      filteredWhereToNumber,
      totalWhereToCount,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL PRODUCTS FROM PAGINATION",
      error,
    });
  }
};
