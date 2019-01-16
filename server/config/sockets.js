const controller = require('../controllers/chats');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log('Client connected with id: ' + socket.id);

        socket[socket.id] = "Anonymous";

        socket.on('changeUsername', (data) => {
            socket[socket.id] = data.username;
        });

        
    });
}