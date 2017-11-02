var router = require('express').Router();

router.use('/restapi', require('./restapi'));

module.exports = router;