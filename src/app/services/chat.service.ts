import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:4765');
  }

  joinChatRoom(roomId: string) {
    this.socket.emit('joinChatRoom', roomId);
  }

  leaveChatRoom(roomId: string) {
    this.socket.emit('leaveChatRoom', roomId);
  }

  sendMessage(roomId: string, sender: string, message: string) {
    this.socket.emit('sendMessage', { roomId, sender, message });
  }

  getNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });
  }
}
