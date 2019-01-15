import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chalk It Up';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.sendMessage('hello from client');
  }
  

}
