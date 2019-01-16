const chatController = require('../controllers/chats');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log('Client connected with id: ' + socket.id);

        let previousId;
        
        const safeJoin = (currentId) => {
            socket.leave(previousId);

            if (currentId) {
                socket.join(currentId);
            }
            previousId = currentId;
        };

        socket.on('getChatRoom', (data) => {
            safeJoin(data.roomId);

            chatController.getChatRoom(data, (response) => {
                if (response.success) {
                    socket.emit('currentChatRoom', response.success);
                }
            });
        });

        socket.on('newChatRoom', (data) => {
            chatController.newChatRoom(data, (response) => {
                if (response.success) {
                    console.log(response.success.chatRooms);
                    // safeJoin(response.success.newChatRoom._id); //join newly created chatroom
                    // socket.emit('currentChatRoom', response.success.newChatRoom);
                    // io.emit('updateChatRooms', response.success.chatRooms); //update list of chatrooms
                }
            });
        });

        socket.on('getChatRooms', () => {
            chatController.allChatRooms((response) => {
                if (response.success) {
                    socket.emit('updateChatRooms', response.success);
                }
            });
        });

        socket.on('renameChatRoom', (data) => {
            chatController.renameChatRoom(data, (response) => {
                if (response.success) {
                    io.emit('updateChatRooms', response.success);
                }
            })
        });

        socket.on('deleteChatRoom', (data) => {
            chatController.deleteChatRoom(data, (response) => {
                if (response.success) {
                    safeJoin(null);

                    io.emit('updateChatRooms', response.success);
                    io.to(`${data.roomId}`).emit('currentChatRoom', null);
                }
            });
        });

        socket.on('newMessage', (data) => {
            chatController.newMessage(data, (response) => {
                if (response.success) {
                    io.to(`${data.roomId}`).emit('currentChatRoom', response.success);
                }
            });
        });
    });
}