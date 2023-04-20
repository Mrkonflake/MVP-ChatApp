const router = require('express').Router();
const controllers = require('./controllers/controllers.js');

router.post('/ai', controllers.ai.askAi);

router.get('/messages', controllers.messages.getAll);
router.post('/messages', controllers.messages.storeMessage);

module.exports = router;