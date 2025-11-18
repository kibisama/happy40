const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    // 에러핸들러로 넘기도록하자
    if (info?.name === "TokenExpiredError") {
      return res.sendStatus(419);
    }
    if (!user.admin) {
      return res.sendStatus(401);
    }
    next();
  })(req, res, next);
};
