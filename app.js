const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

require("./schemas")();

const app = express();
app.set("port", process.env.PORT || 8001);
app.use(morgan("combined"));

if (process.env.NODE_ENV === "production") {
  const helmet = require("helmet");
  const hpp = require("hpp");
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const passport = require("passport");
require("./passport")();
app.use(passport.initialize());

const uap = require("ua-parser-js");
const router = require("./routes");
app.use(
  "/",
  (req, res, next) => {
    req.ua = uap(req.headers["user-agent"]);
    next();
  },
  router
);
app.use(require("./error_handler"));

app.listen(app.get("port"), () =>
  console.log(app.get("port"), "번 포트에서 대기 중")
);
