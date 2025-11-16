const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (authError, user) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      return res.sendStatus(401);
    }
    next();
  })(req, res, next);
};
