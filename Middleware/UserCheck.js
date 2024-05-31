const jwt = require("jsonwebtoken");
const USER = require("../Model/Schema");

//   ------------------------------------------------------------------
const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.UserToken;

    const VerifyToken = jwt.verify(token, process.env.PRIVATE_KEY);

    const rootUser = await USER.findOne({ email: VerifyToken.email });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorize User" });
  }
};

module.exports = authentication;
