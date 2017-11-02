var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var auth = require('../auth');

router.post('/users', function(req,res,next){
    console.log('ovdje smo');
    if(!req.body.user.username){
        return res.status(422).json({errors: {username: 'je obavezno'}});
    }

    if(!req.body.user.email){
        return res.status(422).json({errors: {email: 'je obavezan'}});
    }

    if(!req.body.user.password){
        return res.status(422).json({errors: {password: 'je obavezna'}});
    }

    var user = new User();
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    return user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

router.post('/users/login', function(req,res,next){
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: 'je neispravan'}});
    }

    if(!req.body.user.password){
        return res.status(422).json({errors: {password: 'je netočna'}});
    }

    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){return next(err);}

        if(user){
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()})
        } else {
            return res.status(422).json(info);
        }
    })(req,res,next);
});

router.use(function(err,req,res,next){
    if(err.name === 'ValidationError'){
        return res.json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        })
    }
    return next(err);
});

module.exports = router;