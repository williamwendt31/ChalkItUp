import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string;

  constructor() {}

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    let username = localStorage.getItem('username');

    //if username doesn't exist, create new named 'anonymous'
    if (!username) {
      localStorage.setItem('username', 'anonymous');
      username = 'anonymous';
    }

    this.username = username;
  }

  onUsernameSubmit() {
    if (this.username.length) {
      localStorage.setItem('username', this.username);
    }
  }

  isUsernameInvalid() {
    return !this.username.length;
  }
}
