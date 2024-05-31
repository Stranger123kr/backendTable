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

server.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);

server.use(
  session({
    secret: "This Cart",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);

server.get("/test", (req, res) => {
  req.session.test ? req.session.test++ : (req.session.test = 1);
  res.send(req.session.test.toString());
});

server.use(cookieParser());
server.use(express.json());
server.use("/", router);
// =================================

server.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
