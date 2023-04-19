const router = require('express').Router();
const controllers = require('./controllers/controllers.js');

router.post('/ai', controllers.ai.askAi);

module.exports = router;