var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var auth = require('../auth');


// ruta za stvaranje korisnika, provjerava username, email i lozinku te vraca errore

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




// ruta za login, provjerava  email i lozinku, vraca errore, nastavlja sa passport.authenticate ako je uspjesno (pogledaj config/passport.js)



router.post('/users/login', function(req,res,next){
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: 'ne smije biti prazan'}});
    }

    if(!req.body.user.password){
        return res.status(422).json({errors: {password: 'je netočan'}});
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



// ruta za dobivanje vlastitog profila, služit će kao dobivanje info loginiranog korisnika kad se loginira ili registrira



router.get('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}

        return res.json({user: user.toAuthJSON()})
    }).catch(next);
});



// middleware za lijepe error poruke, a ne zbrku objekta u objektu

router.use(function(err,req,res,next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        })
    }
    return next(err);
});

module.exports = router;