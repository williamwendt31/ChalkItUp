import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../chat-room';
import { Observable, Subscription } from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() username: any;
  newChatRoom: string; 

  chatrooms: Observable<string[]>;
  currentRoom: ChatRoom;

  private _chatSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.toggleSideNav(); //jquery 
    this.getChatRooms(); //get all chat rooms

    this.chatrooms = this.chatService.allChatRooms;
    this._chatSub = this.chatService.currentChatRoom.subscribe(chatroom => this.currentRoom = chatroom);

    this.newChatRoom = "";
    this.currentRoom = null;
  }

  toggleSideNav() {
    $(document).ready(() => {
      $('#menu-toggle').click((event) => {
        event.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });
  }

  getChatRooms() {
    this.chatService.getChatRooms();
  }

  onNewChatSubmit() {
    this.chatService.newChatRoom(this.newChatRoom);
    this.newChatRoom = "";
  }

  changeCurrentRoom(roomId) {

  }

  isNewChatInvalid() {
    return !this.newChatRoom.length;
  }  
}
