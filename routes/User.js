const router = require("express").Router();
const { signup, verifyOtp, login } = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/signup/verifyOtp").post(verifyOtp);
router.route("/signin").post(login);

module.exports = router;
