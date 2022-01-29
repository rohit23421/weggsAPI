const router = require("express").Router();
const {
  signup,
  verifyOtp,
  login,
  verifyOtpLogin,
} = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/signup/verifyOtp").post(verifyOtp);
router.route("/signin").post(login);
router.route("/signin/verifyOtp").post(verifyOtpLogin);

module.exports = router;
