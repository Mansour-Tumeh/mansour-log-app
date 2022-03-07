const express = require("express");
const { manageUsersController} = require("../controllers/adminController");

const {  validateCookie } = require("../middleware/cookieValidator");
const { isAdmin } = require('../middleware/auth-admin');
const router = express.Router();

// these routes create and set cookie to authenticated users
router.get("/users", validateCookie,isAdmin('supervisor','admin'), manageUsersController);


module.exports = router;
