import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent implements OnInit, OnDestroy {
  @Input() currentRoom: any;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    console.log('creating ' + this.currentRoom);
  }

  ngOnDestroy() {
    console.log('destroying' + this.currentRoom);
  }

}
