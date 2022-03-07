const express = require("express");
const { addProductController } = require("../controllers/productControllers");
const { validateCookie } = require("../middleware/cookieValidator");
const router = express.Router();

// these routes create and set cookie to authenticated users
router.post("/add", validateCookie, addProductController);

module.exports = router;
