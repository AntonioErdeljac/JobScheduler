var router = require('express').Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');

var auth = require('../auth');

router.param('username', function(req,res,next,username){
    User.findOne({username: username}).then(function(user){
        if(!user){return res.sendStatus(404);}

        req.profile = user;

        return next();
    }).catch(next);
});

router.get('/:username', auth.optional, function(req,res,next){
    return res.json({profile: req.profile.toProfileJSON()})
});

module.exports = router;