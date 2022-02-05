const router = require("express").Router();
const {
  createWhereTo,
  updateWhereTo,
  deleteWhereTo,
  getWhereTo,
  getAllWhereTo,
} = require("../controllers/whereToBuyController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJwtToken");

router
  .route("/whereto")
  .post(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    createWhereTo
  );

router
  .route("/whereto/:id")
  .get(getWhereTo)
  .put(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    updateWhereTo
  )
  .delete(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    deleteWhereTo
  );

router.route("/wheretos").get(getAllWhereTo);

module.exports = router;
