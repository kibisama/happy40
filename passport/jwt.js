const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const Admin = require("../schemas/admin");

module.exports = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        const { admin, sub } = jwt_payload;
        try {
          let user;
          if (admin < 5) {
            user = await Admin.findOne({ id: sub });
          } else {
            //
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (e) {
          done(e, false);
        }
      }
    )
  );
};
