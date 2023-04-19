const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const routes = require('./routes');
const openai = require('./AiConfig.js');
const dotenv = require('dotenv').config();
const io = require('socket.io')(server, {
  cors: {
    origin: [process.env.CLIENT],
  }
});
const morgan = require('morgan');
const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', routes);

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);

  setInterval(function(){
    socket.emit('news_by_server', {
      time: new Date()
    });
}, 1000);

  socket.on('send-message', (obj) => {
    console.log(obj);
    io.emit('recieve-message', (obj))
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
