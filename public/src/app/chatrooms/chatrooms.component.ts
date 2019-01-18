import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../chat-room';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent implements OnInit, OnDestroy {
  @Input() currentRoom: ChatRoom;
  @Input() username: string;

  numberOfUsers: number;
  newMessage: string;

  private _numSub: Subscription;
  
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.numberOfUsers = 0;
    this.newMessage = "";

    this._numSub = this.chatService.updateNumberOfUsers.subscribe((numberOfUsers) => {
      this.numberOfUsers = numberOfUsers;
    });
  }

  ngOnDestroy() {
    this._numSub.unsubscribe();
  }

  onNewMessageSubmit() {
    if (this.newMessage.length && this.username.length) {
      this.chatService.newMessage(this.newMessage, this.username, this.currentRoom._id);
      this.newMessage = "";
    }
  }

  isNewMessageInvalid() {
    return !this.newMessage.length;
  }

  onDeleteRoom(roomId) {
    this.chatService.deleteChatRoom(roomId);
  }
}
