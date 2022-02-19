const express = require("express");
const router = express.Router();
const {
  sendRazorpayKey,
  captureRazorpayPayment,
} = require("../controllers/paymentController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJwtToken");

router
  .route("/razorpaykey")
  .get(verifyToken, verifyTokenAndAuthorization, sendRazorpayKey);

router
  .route("/capturerazorpaypayment")
  .post(verifyToken, verifyTokenAndAuthorization, captureRazorpayPayment);

module.exports = router;
