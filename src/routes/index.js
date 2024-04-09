const express= require('express');
const v1apiRoutes = require('./v1/index')
const router = express.Router();

router.use('/v1',v1apiRoutes); 

module.exports = router ;