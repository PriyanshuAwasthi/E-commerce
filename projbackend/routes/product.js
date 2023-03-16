const express = require("express");
const router = express.Router();



const { getAllProducts, getAllUniqueProducts, getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");



router.param("productId", getProductById);
router.param("userId", getUserById);



router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueProducts);



module.exports = router;