const router = require("express").Router();
const {
  getTotalCustomersCount,
  getTotalCustomersPagination,
  getAllOrdersPagination,
  getAllProductsPagination,
  getAllWhereTosPagination,
  getyearlyordercount,
  getweeklyordercount,
  getmonthlyordercount,
  getdailyordercount,
  getyearlyusercount,
  getmonthlyusercount,
  getweeklyusercount,
  getdailyusercount,
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

router
  .route("/admin/yearlyorders")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getyearlyordercount
  );
router
  .route("/admin/weeklyorders")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getweeklyordercount
  );
router
  .route("/admin/monthlyorders")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getmonthlyordercount
  );
router
  .route("/admin/dailyorders")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getdailyordercount
  );

router
  .route("/admin/yearlyusers")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getyearlyusercount
  );

router
  .route("/admin/monthlyusers")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getmonthlyusercount
  );

router
  .route("/admin/weeklyusers")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getweeklyusercount
  );

router
  .route("/admin/dailyusers")
  .get(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    getdailyusercount
  );

module.exports = router;
