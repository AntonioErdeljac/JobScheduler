var router = require('express').Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');

var auth = require('../auth');

//middleware koji trazi username te pomocu mongoosa pregledava dali postoji u DB

router.param('username', function(req,res,next,username){
    User.findOne({username: username}).then(function(user){
        if(!user){return res.sendStatus(404);}

        req.profile = user;

        return next();
    }).catch(next);
});

// ruta vraca korisnika u obliku profila

router.get('/:username', auth.optional, function(req,res,next){
    return res.json({profile: req.profile.toProfileJSON()})
});

module.exports = router;