const controller = require('../controllers/chats');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log('Client connected with id: ' + socket.id);

        socket.on('message', (data) => {
            console.log(data);
        });

    });
}