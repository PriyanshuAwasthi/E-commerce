const express = require("express");
const router = express.Router();


const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user.js");


router.param("userId", getUserById);

// router.get("/users", getAllUsers);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);


module.exports = router;
