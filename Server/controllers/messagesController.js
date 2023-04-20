const models = require('../models/models.js');

module.exports = {
  getAll: (req, res) => {
    models.messages.getAll((err, results) => {
      if (err) console.log('error getting all')
      res.send(results);
    })
  },

  storeMessage:(req, res) => {
    models.messages.storeMessage(req.body, (err) => {
      if (err)  throw err
    })
  },
};