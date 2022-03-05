const router = require("express").Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getAllOrdersByUser,
  getOneOrderByUser,
} = require("../controllers/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJwtToken");

router
  .route("/order")
  .post(verifyToken || verifyTokenAndAuthorization, createOrder);
router
  .route("/order/:id")
  .get(verifyTokenAndAuthorization, getOrder)
  .put(verifyTokenAndAdmin, updateOrder)
  .delete(verifyTokenAndAdmin, deleteOrder);

router.route("/orders").get(verifyTokenAndAdmin, getAllOrders);

router.route("/orders/:id").get(verifyToken, getAllOrdersByUser);

router.route("/ordersingle/:id/:orderId").get(verifyToken, getOneOrderByUser);

module.exports = router;
