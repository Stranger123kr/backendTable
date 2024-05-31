const USER = require("../Model/Schema");
const jwt = require("jsonwebtoken");

// =================================

const Create = async (req, res) => {
  try {
    const { name, email, dob, password } = req.body;
    const NewUser = await USER.findOne({ email: email });

    if (!name || !email || !dob || !password) {
      res.status(400).json({ message: "Please Fill All The Fields" });
    } else if (NewUser) {
      res
        .status(409)
        .json({ message: "You Are Already Exist Add New Email Id" });
    } else {
      const NewUSER = new USER({
        name,
        email,
        dob,
        password,
      });
      await NewUSER.save();
      res.status(201).json({ message: "User Register Successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// =================================

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // -----------------------------------------------------------

    if (!email || !password) {
      res.status(406).json("Fill All The Empty Fields");
    }

    // -----------------------------------------------------------

    const UserValidate = await USER.findOne({ email: email });

    // -----------------------------------------------------------

    if (!UserValidate || password !== UserValidate.password) {
      res.status(401).json("Your Credentials Not Match Try Again");

      // -----------------------------------------------------------
    } else {
      // generating jwt token and store in cookie

      const token = jwt.sign({ email: email }, process.env.PRIVATE_KEY);
      res.cookie("UserToken", token, {
        httpOnly: true,
        secure: false,
      });

      res.status(200).json({ msg: "User Found Successfully", token });
    }
  } catch (error) {
    res.status(404).json({ error });
    console.log(error);
  }
};

// =================================

const AuthCheck = async (req, res) => {
  try {
    const UserValidate = await USER.findOne({ _id: req.userId });
    res.status(200).json(UserValidate);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// =================================

const Read = async (req, res) => {
  try {
    const AllUSER = await USER.find({});
    res.status(200).json(AllUSER);
  } catch (error) {
    res.status(404).json(error);
  }
};

// =================================

const Logout = async (req, res) => {
  try {
    const token = req.cookies.UserToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      res.clearCookie("UserToken", { path: "/" });
      res.status(200).json({ message: "User logged out" });
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

// ------------------------------

module.exports = { Read, Create, Login, AuthCheck, Logout };
