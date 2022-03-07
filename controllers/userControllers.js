const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
const { validateCookie } = require("../middleware/cookieValidator");

exports.loginController = async (req, res) => {
  try {
    const db_user = await UserModel.findOne({ email: req.body.email }).select('-password -__v');
    if (!db_user)
      return res
        .status(404)
        .json({ errMsg: "user not found, please register!" });

    const payload = { userId: db_user._id, email: req.body.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("auth_token", token, { httpOnly: true, secure: false })
      .json(db_user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.registerController = async (req, res) => {
  try {
    const { username, email, password , role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = { username, email, password: encryptedPassword , role };
    const createdUser = await UserModel.create(newUser);

    const payload = { userId: createdUser._id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token_cookie", token, { httpOnly: true, secure: false })
      .json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.logoutController = async (req, res) => {
  res.clearCookie("auth_token").json({ msg: "logged out successfully!" });
};
