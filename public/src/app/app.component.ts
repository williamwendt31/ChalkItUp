import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    $(document).ready(() => {
      $('#menu-toggle').click((event) => {
        event.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });
  }
  

}
