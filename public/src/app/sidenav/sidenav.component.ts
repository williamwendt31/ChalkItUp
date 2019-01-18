import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../chat-room';
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() username: string;
  newChatRoom: string; 

  chatrooms: ChatRoom[];
  currentRoom: ChatRoom;

  private _chatSub: Subscription;
  private _roomsSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    //initialize variables
    this.newChatRoom = "";
    this.currentRoom = null;

    this.toggleSideNav(); 
    this.getChatRooms();

    this._roomsSub = this.chatService.allChatRooms.subscribe((chatrooms) => this.chatrooms = chatrooms);
    this._chatSub = this.chatService.currentChatRoom.subscribe((chatroom) => this.currentRoom = chatroom);
  }

  //unsubscribe once component destroyed
  ngOnDestroy() {
    this._chatSub.unsubscribe();
    this._roomsSub.unsubscribe();
  }

  //jquery for sidenav
  toggleSideNav() {
    $(document).ready(() => {
      $('#menu-toggle').click((event) => {
        event.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });
  }

  //ask for list of chatrooms
  getChatRooms() {
    this.chatService.getChatRooms();
  }

  //create chatroom on form submit
  onNewChatSubmit() {
    if (this.newChatRoom.length) {
      this.chatService.newChatRoom(this.newChatRoom);
      this.newChatRoom = "";
    }
  }

  //load chatroom
  loadChatRoom(roomId) {
    this.chatService.getChatRoom(roomId);
  }

  //only allow button to be clickable if not empty
  isNewChatInvalid() {
    return !this.newChatRoom.length;
  }  
}
