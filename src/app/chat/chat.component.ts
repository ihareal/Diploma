import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private hubConnection: HubConnection;
  public nick = '';
  public message = '';
  public messages: string[] = [];
  constructor(
  ) { }

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44338/api/chat').build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log(err));

    this.hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
      let text = `${nick}: ${receivedMessage}`;
        this.messages.push(text);
    });
  }

  public sendMessage(): void {
    this.hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .then(() => this.message = '')
      .catch(err => console.error(err));
  }

}
