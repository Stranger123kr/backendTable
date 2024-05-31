const express = require("express");
const server = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./DB/Connect");
const session = require("express-session");
// =================================

const router = require("./Routes/Route");

// =================================

server.use(cookieParser());

server.use(
  session({
    secret: "keySecret",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      sameSite: "None",
      secure: true,
    },
  })
);

server.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);

server.get("/test", (req, res) => {
  req.session.test ? req.session.test++ : (req.session.test = 1);
  res.send(req.session.test.toString());
});

server.use(express.json());
server.use("/", router);
// =================================

server.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
