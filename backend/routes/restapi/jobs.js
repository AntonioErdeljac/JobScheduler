var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();
var auth = require('../auth');
var Agenda = require('agenda');
var slug = require('slug');


// agenda se povezuje na DB;

var agenda = new Agenda({db: {address: 'mongodb://localhost/jobscheduler'}});

// startam agendu

agenda.on('ready', function(){
    agenda.start();
});


// definiram osnovni posao

agenda.define('new job', function(job, done){
    console.log('job started');
    done();
});


// ruta za stvaranje poslova, prima schedule i title joba.

router.post('/', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}

        var scheduleProperty = req.body.job.schedule;

        var slugProperty = slug(req.body.job.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

        agenda.schedule(scheduleProperty,'new job', {author: user, uniqueSlug: slugProperty});

        return res.sendStatus(200);
    })
});


// ruta za fetchanje poslova ovisno o autoru

router.get('/:username', auth.required, function(req,res,next){
    agenda.jobs({}, function(err, jobs){
        if(err) return next(err);
        return res.json({
            jobs: jobs.map(function(job){
                if(job.attrs.data.author.username === req.params.username){
                    return job;
                }
            })
        })
    }).catch(next);
});


//ruta za fetchanje svih poslova

router.get('/', auth.required, function(req,res,next){
    agenda.jobs({}, function(err, jobs){
        return res.json({
            jobs: jobs
        });
    });
});



// ruta za brisanje poslova, (provjerava jeli zahtjevatelj brisanja autor posla, te dali postoji posao (403 ili 404))

router.delete('/:slug', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        agenda.jobs({}, function(err, jobs){
            if(err) return next(err);

            jobs.map(function(job){
                if(job.attrs.data.uniqueSlug === req.params.slug){
                    if(job.attrs.data.author.username === user.username){
                        job.remove();
                        return res.sendStatus(204);
                    } else {
                        return res.sendStatus(403);
                    }
                } else {
                    return res.sendStatus(404);
                }
            })
        })
    }).catch(next);
});


module.exports = router;