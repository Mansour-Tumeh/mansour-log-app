const jwt = require("jsonwebtoken");
const {UserModel} = require('../models/UserModel');

exports.validateCookie = async (req, res, next) => {
  
  const token = req.cookies.auth_token;
  if (!token) {
    return res
    .status(403)
    .json({ errMsg: "you are a not valid user, please login!" });
  }
  
  // we could pass this payload to check if the user who sent the cookie is the same user that is authenticated
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  const id = decodedUser.userId;
  const user = await UserModel.findById(id).select('-password');
  if(!user){
   return res.status(401).json({ msg :'user not found '})
  }
   
  req.user = user;

  next();
};
