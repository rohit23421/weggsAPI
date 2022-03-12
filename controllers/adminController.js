const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const WhereToBuy = require("../models/wheretobuy");
const WhereClause = require("../middlewares/whereClause");

//ADMIN GET ONE USER
exports.getOneCustomer = async (req, res) => {
  try {
    const Founduser = await User.findById(req.params.id);
    Founduser.password = undefined;
    res.status(200).json({
      success: true,
      Founduser,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR FROM GET ONE USER",
    });
  }
};

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
  const limit = req.query.limit;

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
  // if(!req.query.limit){
  //   const limit = 3;
  // }else{
  //   const limit = req.query.limit;
  // }

  const limit = 3;

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
  const limit = req.query.limit;

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

//GET TOTAL USER COUNT - YEARLY
exports.getyearlyusercount = async (req, res) => {
  let dateNow = new Date();
  let currentyear = new Date(new Date().getFullYear(), 0, 1);
  try {
    const yearly = await User.aggregate([
      {
        $match: {
          createdAt: {
            $lt: dateNow,
            $gt: currentyear,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);
    console.log(yearly);
    console.log(currentyear);
    res.status(200).json({
      success: true,
      yearly,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL yearly user",
      error,
    });
  }
};

//GET TOTAL USER COUNT - MONTHLY
exports.getmonthlyusercount = async (req, res) => {
  let dateNow = new Date();
  let months = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
  try {
    const monthly = await User.aggregate([
      {
        $match: {
          createdAt: {
            $lt: dateNow,
            $gt: months,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);
    console.log(monthly);
    res.status(200).json({
      success: true,
      monthly,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL monthly user",
      error,
    });
  }
};

//GET TOTAL USER COUNTS - WEEKLY
exports.getweeklyusercount = async (req, res) => {
  let dateNow = new Date();
  const currentime = new Date();
  let startweek = new Date(
    dateNow.setDate(dateNow.getDate() - dateNow.getDay())
  );
  try {
    const weekly = await User.aggregate([
      {
        $match: {
          createdAt: {
            $lt: currentime,
            $gt: startweek,
          },
        },
      },
      {
        $group: {
          _id: {
            Week: { $week: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);

    console.log(weekly);
    console.log(currentime);
    res.status(200).json({
      success: true,
      weekly,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL weekly user",
      error,
    });
  }
};

//GET TOTAL USER COUNTS - DAILY
exports.getdailyusercount = async (req, res) => {
  let dateNow = new Date();
  let yesterday = new Date(dateNow.setDate(dateNow.getDate() - 1));
  const currentime = new Date();
  try {
    const daily = await User.aggregate([
      {
        $match: {
          createdAt: {
            $lt: currentime,
            $gt: yesterday,
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            Week: { $week: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);
    console.log(currentime);
    console.log(daily);
    res.status(200).json({
      success: true,
      daily,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL daily user",
      error,
    });
  }
};

//GET TOTAL ORDER COUNTS - YEARLY
exports.getyearlyordercount = async (req, res) => {
  let dateNow = new Date();
  const currentime = new Date();
  let currentyear = new Date(new Date().getFullYear(), 0, 2);
  currentyear.setUTCHours(0, 0, 0, 0);
  try {
    const yearly = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: currentime,
            $gte: currentyear,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
          },
          Amount: {
            $sum: "$totalAmount",
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalcount: "$count",
          sales: "$Amount",
        },
      },
    ]);
    console.log(yearly);
    console.log(currentyear);
    res.status(200).json({
      success: true,
      yearly,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL yearly order",
      error,
    });
  }
};

//GET TOTAL ORDER COUNTS - MONTHLY
exports.getmonthlyordercount = async (req, res) => {
  let dateNow = new Date();
  const currentime = new Date();
  let months = new Date(dateNow.getFullYear(), dateNow.getMonth(), 2);
  months.setUTCHours(0, 0, 0, 0);
  try {
    const monthly = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: currentime,
            $gte: months,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          Amount: {
            $sum: "$totalAmount",
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalcount: "$count",
          sales: "$Amount",
        },
      },
    ]);

    console.log(monthly);
    console.log(months);
    res.status(200).json({
      success: true,
      monthly,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL monthly order",
      error,
    });
  }
};

//GET TOTAL ORDER COUNTS - WEEKLY
exports.getweeklyordercount = async (req, res) => {
  let dateNow = new Date();
  const currentime = new Date();
  let startweek = new Date(
    dateNow.setDate(dateNow.getDate() - dateNow.getDay() + 1)
  );
  startweek.setUTCHours(0, 0, 0, 0);
  try {
    const weeklyorder = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: currentime,
            $gte: startweek,
          },
        },
      },
      {
        $group: {
          _id: {
            Week: { $week: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          Amount: {
            $sum: "$totalAmount",
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalcount: "$count",
          sales: "$Amount",
        },
      },
    ]);

    console.log(weeklyorder);
    console.log(startweek);
    res.status(200).json({
      success: true,
      weeklyorder,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL weekly order",
      error,
    });
  }
};

//GET TOTAL ORDER COUNTS - DAILY
exports.getdailyordercount = async (req, res) => {
  let dateNow = new Date();
  dateNow.setUTCHours(0, 0, 0, 0);
  const currentime = new Date();
  try {
    const daily = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: currentime,
            $gte: dateNow,
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            Week: { $week: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          // Count the no of sales
          count: {
            $sum: 1,
          },

          Amount: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalcount: "$count",
          sales: "$Amount",
        },
      },
    ]);
    console.log(dateNow);
    console.log(daily);
    res.status(200).json({
      success: true,
      daily,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN GETTING TOTAL daily order",
      error,
    });
  }
};
