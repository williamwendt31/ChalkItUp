const mongoose = require('mongoose');
const Chat = mongoose.model('ChatRoom');
const Message = mongoose.model('Message');

module.exports = {
    getChatRoom: (data, callback) => {
        Chat.findById(data.roomId, (err, chatroom) => {
            if (err) {
                return callback({ error: err });
            } else {
                return callback({ success: chatroom });
            }
        });
    },
    allChatRooms: (callback) => {
        Chat.find({}, '_id name', (err, chatrooms) => {
            if (err) {
                return callback({ error: err });
            } else {
                return callback({ success: chatrooms });
            }
        });
    },
    newChatRoom: (data, callback) => {
        Chat.create({ roomName: data.roomName }, (err, newChatRoom) => {
            if (err) {
                return callback({ error: err });
            } else {
                Chat.find({}, '_id name', (err, chatRooms) => {
                    if (err) {
                        return callback({ error: err });
                    } else {
                        return callback({ success: { newChatRoom: newChatRoom, chatRooms: chatRooms }});
                    }
                });
            }
        });
    },
    renameChatRoom: (data, callback) => {
        Chat.findByIdAndUpdate(data.roomId, { $set: { name: data.roomName }}, { runValidators: true }, (err) => {
            if (err) {
                return callback({ error: err }); 
            } else {
                Chat.find({}, '_id name', (err, chatrooms) => {
                    if (err) {
                        return callback({ error: err });
                    } else {
                        return callback({ success: chatrooms });
                    }
                });
            }
        });
    },
    deleteChatRoom: (data, callback) => {
        Chat.findByIdAndDelete(data.roomId, (err) => {
            if (err) {
                return callback({ error: err });
            } else {
                Chat.find({}, '_id name', (err, chatrooms) => {
                    if (err) {
                        return callback({ error: err });
                    } else {
                        return callback({ success: chatrooms });
                    }
                });
            }
        })
    },
    newMessage: (data, callback) => {
        Message.create({ username: data.username, message: data.message }, (err, message) => {
            if (err) {
                return callback({ error: err });
            } else {
                Chat.findByIdAndUpdate(data.roomId, { $push: { messages: message }}, { runValidators: true, new: true }, (err, chatroom) => {
                    if (err) {
                        return callback({ error: err });
                    } else {
                        return callback({ success: chatroom });
                    }
                });
            }
        });
    }
}