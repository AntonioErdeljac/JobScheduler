var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done){
    User.findOne({email: email}).then(function(user){
        if(!user){return done(null, false, {errors: {email: 'je neispravan.'}})}
        else if(!user.validPassword(password)){
            return done(null, false, {errors: {password: 'je netočna'}});
        }

        return done(null, false);
    }).catch(done);
}));