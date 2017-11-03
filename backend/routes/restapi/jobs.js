var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();
var auth = require('../auth');
var Agenda = require('agenda');
var slug = require('slug');

//postavke za slack integraciju

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || 'xoxb-266397551667-uekxKPTL0INks9sWvzEPqOZt';

var rtm = new RtmClient(bot_token);




// agenda se povezuje na DB;

var agenda = new Agenda({db: {address: 'mongodb://localhost/jobscheduler'}});

// startam agendu

agenda.on('ready', function(){
    agenda.start();
});


// definiram osnovni posao

agenda.define('new job', function(job, done){
    setTimeout(function(){
        console.log('simulacija nekog procesa');
        done()
    }, 500);
});


// ruta za stvaranje poslova, prima schedule i title joba.

router.post('/', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}

        if(typeof req.body.job.schedule === 'undefined'){
            return res.status(422).json({errors: {schedule: 'je obavezno'}})
        }

        if(typeof req.body.job.title === 'undefined'){
            return res.status(422).json({errors: {title: 'je obavezan'}})
        }

        var scheduleProperty = req.body.job.schedule;

        var slugProperty = slug(req.body.job.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

        agenda.schedule(scheduleProperty,'new job', {author: user.toProfileJSON(), uniqueSlug: slugProperty, title: req.body.job.title, schedule: scheduleProperty});


        //postavke za slack interaciju

        var channel = 'general';

        rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData){
            for (const c of rtmStartData.channels) {
            if (c.is_member && c.name ==='general') { channel = c.id }
        }
        console.log('Logged in as '+rtmStartData.self.name+' of team '+rtmStartData.team.name+', but not yet connected to a channel');
        });

        //slanje poruke na slack, koristio bio `${nekaVrijednost}`, ali nije postavljen ES6
        //radi to svejedno ali mi smeta sto se crveni u WebStormu

        rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
            rtm.sendMessage("*Novi posao:* "+req.body.job.title+', *Vrjieme*: '+req.body.job.schedule+', *Autor*: '+user.username+' *Slug*: '+slugProperty, channel);
        });

        rtm.start();


        //trazim specificni job sa uniqueSlug koji sam stvorio pri schedulrianju agende
        // zatim nadjem taj job i returnam ga kao json

        agenda.jobs({}, function(err, jobs){
            jobs.map(function(job){
                if(job.attrs.data.uniqueSlug === slugProperty){
                    return res.json({
                        job: job
                    })
                }
            })
        })


    })
});


//rute za fetchanje gotovih poslova

router.get('/completed', auth.optional, function(req,res,next){
    agenda.jobs({}, function(err, jobs){
        return res.json({
            jobs: jobs.map(function(job){
                if(job.lastFinishedAt){
                    return job;
                }
            })
        })
    })


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
    })
});


});

//ruta za fetchanje svih poslova

router.get('/', auth.optional, function(req,res,next){
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