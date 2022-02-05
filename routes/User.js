const router = require("express").Router();
const {
  signup,
  verifyOtp,
  verifyOtpLogin,
  logout,
  pagination,
} = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/signup/verifyOtp").post(verifyOtp);
router.route("/signin/verifyOtp").post(verifyOtpLogin);
router.route("/logout").get(logout);

// router.route("/user").get(pagination);

module.exports = router;
