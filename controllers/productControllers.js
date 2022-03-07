exports.addProductController = async (req, res) => {
  console.log("decoded user accessed from req object", req.encodedUser);

  // check if this user actually is autherized to carry out this process
  // we have roles: encodedUser belongs to whice role
  res.json({ msg: "ok you can add a product" });
};
