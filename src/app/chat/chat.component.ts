import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private hubConnection: signalR.HubConnection;
  public nick = '';
  public message = '';
  public messages: string[] = [];
  public email: string;
  constructor(
  ) { }

  ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44338/chat').build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Connection problem: '+ err));
      this.email = localStorage.getItem('email');
    this.hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
      debugger;
      let text = `${this.email}: ${receivedMessage}`;
        this.messages.push(text);
    });
  }

  public sendMessage(): void {
    this.hubConnection
      .invoke('sendToAll', this.email, this.message)
      .then(() => this.message = '')
      .catch(err => console.error(err));
  }

}
