const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const ChatRoomSchema = mongoose.Schema({
    name: { type: String, required: true },
    messages: [MessageSchema]
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
mongoose.model('ChatRoom', ChatRoomSchema);