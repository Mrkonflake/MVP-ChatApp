const models = require('../models/models.js');
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: [process.env.CLIENT],
  }
});

module.exports = {
  askAi: (req, res) => {
    models.ai.askAi(req.body, (err, results) => {
      if (err) console.log(err);
      console.log(results)
      res.json(results)
      models.messages.storeMessage({username: 'OpenAi', message: results}, (err) => {
        if (err)  throw err
      })
        io.emit('recieve-message', {username: 'OpenAi', message: results})
    })
  },
};