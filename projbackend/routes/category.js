const express = require("express");
const router = express.Router();



const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { createCategory, getCategoryById, updateCategory, getCategory, getAllCategory, removeCategory } = require("../controllers/category");
const { model } = require("mongoose");



router.param("userId", getUserById);
router.param("categoryId", getCategoryById);



router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
router.get("/category/:userId", getCategory);
router.post("/categories", getAllCategory);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);







module.exports = router;