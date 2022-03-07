const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
const { validateCookie } = require("../middleware/cookieValidator");

// get a list of all users
exports.manageUsersController = async (req, res) => {
  try {
    const db_users = await UserModel.find().select('-password -__v');
    if (!db_users)
      return res
        .status(404)
        .json({ errMsg: "no users not found" });

    
    res
      .status(200)     
      .json(db_users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

