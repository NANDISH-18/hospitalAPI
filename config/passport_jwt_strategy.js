const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');

// passport Authentication
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretHospitalKey"
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    // finding Doctor
    Doctor.findById(jwtPayload._id,function(err,user){
        // Error Handling
        if(err){
            console.log('Error in finding user from JWT');
            return done(err, false);
        }
        // if user is found
        if(user){
            return done(null, user);
        }else{
            return done(null,false);
        }
    })


}))

module.exports = passport;
