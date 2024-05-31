const routers = require("../Controller/CurdController");
const express = require("express");
const router = express.Router();
const authentication = require("../Middleware/UserCheck");
const { Read, Create, Login, AuthCheck, Logout } = routers;

router
  .get("/userValidate", authentication, AuthCheck)
  .get("/user", Read)
  .get("/logout", Logout)
  .post("/register", Create)
  .post("/login", Login);
module.exports = router;
