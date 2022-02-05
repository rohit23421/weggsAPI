const router = require("express").Router();
const {
  getTotalCustomersCount,
  getTotalCustomersPagination,
  getAllOrdersPagination,
  getAllProductsPagination,
  getAllWhereTosPagination,
} = require("../controllers/adminController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJwtToken");

router
  .route("/admin/totalcust")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getTotalCustomersCount
  );

router
  .route("/admin/totalcustfilter")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getTotalCustomersPagination
  );

router
  .route("/admin/totalorders")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getAllOrdersPagination
  );

router
  .route("/admin/totalproducts")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getAllProductsPagination
  );

router
  .route("/admin/totalwheretos")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getAllWhereTosPagination
  );

module.exports = router;
