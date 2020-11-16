var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function() {
  // serializeUser turns an user obj into an ID
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // deserializeUser turns an ID in to a user obj
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use("login", new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }

      // If no user exists, then your user isn’t authenticated;
      // say that you’ve finished with the message “No user has that username!”
      if (!user) {
        return done(null, false, { message: "No user has that username!" });
      }

      // If the user does exist, compare their real password with
      // the password you supply. If the password matches, return
      // the current user. If it doesn’t, return “Invalid password.”
      user.checkPassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password." });
        }
      });
    });
  }));

};
