const passport=require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: '370106910960-8mvajak0gonkjvjlod3l4ivlt2d1njru.apps.googleusercontent.com',
    clientSecret: '4Y4dUInK0bi225x__YoPygQO',
    callbackURL: "http://localhost:3002/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));