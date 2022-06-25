const isAdmin = (req, res, next) => {
  if (!req.cookies.isAdmin) {
    return res
      .status(401)
      .json({ message: "User need to login as admin user" });
  }
  next();
};

module.exports = {
  isAdmin,
};
