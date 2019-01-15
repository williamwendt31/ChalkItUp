const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const API_PORT = 8000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

mongoose.connect('mongodb://localhost/chalk', { useNewUrlParser: true });
require('./server/config/mongoose');

require('./server/config/sockets')(io);

server.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));