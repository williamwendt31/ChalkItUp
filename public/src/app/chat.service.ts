import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatRoom } from './chat-room';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  allChatRooms = this.socket.fromEvent<ChatRoom[]>('updateChatRooms'); //array of Chat Rooms
  currentChatRoom = this.socket.fromEvent<ChatRoom>('currentChatRoom'); //current Chat Room
  updateNumberOfUsers = this.socket.fromEvent<number>('updateNumberOfUsers'); //update number of users in chat room

  getChatRooms() {
    this.socket.emit('getChatRooms');
  }

  getChatRoom(roomId) {
    this.socket.emit('getChatRoom', { roomId: roomId });
  }

  newChatRoom(roomName) {
    this.socket.emit('newChatRoom', { roomName: roomName });
  }

  renameChatRoom(roomName, roomId) {
    this.socket.emit('renameChatRoom', { roomName: roomName, roomId: roomId });
  }

  deleteChatRoom(roomId) {
    this.socket.emit('deleteChatRoom', { roomId: roomId });
  }

  newMessage(msg, username, roomId) {
    this.socket.emit('newMessage', { message: msg, username: username, roomId: roomId });
  }
}
