const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require("../controllers/productController");

const { getAllProductsPagination } = require("../controllers/adminController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJwtToken");

router
  .route("/product")
  .post(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    createProduct
  );
router
  .route("/product/:id")
  .get(getProduct)
  .put(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    updateProduct
  )
  .delete(
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    deleteProduct
  );

router.route("/products").get(getAllProduct);

router.route("/productspaginated").get(getAllProductsPagination);

module.exports = router;
