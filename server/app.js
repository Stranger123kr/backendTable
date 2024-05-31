const express = require("express");
const server = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./DB/Connect");
// =================================

const router = require("./Routes/Route");

// =================================

server.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());
server.use("/", router);
// =================================

server.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
