const chatController = require('../controllers/chats');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log('Client connected with id: ' + socket.id);

        let previousId;
        
        const safeJoin = (currentId) => {
            socket.leave(previousId);
            socket.join(currentId);
            
            let previousRoom = io.sockets.adapter.rooms[`${previousId}`];
            let currentRoom = io.sockets.adapter.rooms[`${currentId}`];

            if (previousRoom) {
                io.to(`${previousId}`).emit('updateNumberOfUsers', previousRoom.length);
            }

            if (currentRoom) {
                io.to(`${currentId}`).emit('updateNumberOfUsers', currentRoom.length);
            }

            previousId = currentId;
        }

        socket.on('getChatRoom', (data) => {
            chatController.getChatRoom(data, (response) => {
                if (response.success) {
                    socket.emit('currentChatRoom', response.success);
                    safeJoin(data.roomId);
                }
            });
        });

        socket.on('newChatRoom', (data) => {
            chatController.newChatRoom(data, (response) => {
                if (response.success) {
                    socket.emit('currentChatRoom', response.success.newChatRoom);
                    io.emit('updateChatRooms', response.success.chatRooms); //update list of chatrooms
                    safeJoin(response.success.newChatRoom._id); //join newly created chatroom
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
                    io.emit('updateChatRooms', response.success);
                    io.to(`${data.roomId}`).emit('currentChatRoom', null);
                    safeJoin(null);
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