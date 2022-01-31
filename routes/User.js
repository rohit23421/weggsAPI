const router = require("express").Router();
const {
  signup,
  verifyOtp,
  verifyOtpLogin,
  logout,
} = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/signup/verifyOtp").post(verifyOtp);
router.route("/signin/verifyOtp").post(verifyOtpLogin);
router.route("/logout").get(logout);

module.exports = router;
