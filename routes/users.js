const express = require("express");
const {
  loginController,
  registerController,
  logoutController
} = require("../controllers/userControllers");
const { validateCredentials } = require("../middleware/requestValidator");
const router = express.Router();

// these routes create and set cookie to authenticated users
router.post("/login", validateCredentials, loginController);
router.post("/register", validateCredentials, registerController);
router.get("/logout", logoutController);

module.exports = router;
