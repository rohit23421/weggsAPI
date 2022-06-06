const router = require("express").Router();
const {
  signup,
  verifyOtp,
  verifyOtpLogin,
  logout,
  updateUser,
  pagination,
  verifiedOtpUserSignup,
} = require("../controllers/userController");

const { getAllProductsPagination } = require("../controllers/adminController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyJwtToken");

router.route("/signup").post(signup);

router.route("/signup/verifyOtp").post(verifyOtp);

// router.route("/signup/verifyOtpUser").post(verifiedOtpUserSignup);
router.route("/signin").post(verifyOtpLogin);
router.route("/logout").get(logout);

router.route("/userupdate/:id").put(verifyToken, updateUser);

router.route("/totalproducts").get(verifyToken, getAllProductsPagination);

module.exports = router;
