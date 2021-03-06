const isEmail = require("validator/lib/isEmail");

// a middleware is just a fancy name for a function that runs before the controller
exports.validateCredentials = (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.url);

  // check username
  if (username?.length < 6)
    return res
      .status(400)
      .json({ errMsg: "username must be at least 6 characters long!" });

  // check email
  if (email.length < 6)
    return res
      .status(400)
      .json({ errMsg: "email must be at least 6 characters long!" });
  if (!isEmail(email))
    return res.status(400).json({ errMsg: "email must be valid!" });

  // check password
  if (req.url === "/register") {
    if (password.length < 8)
      return res
        .status(400)
        .json({ errMsg: "password must be at least 8 characters long!" });
  }

  next();
};
