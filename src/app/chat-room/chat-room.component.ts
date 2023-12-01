import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
//import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  @Input() ChatId: string = "";
  public sender: string = '';
  public message: string = '';
  public roomId: string = '';
  public messages: any[] = [];
  
  // get user id
  public currentUserId: string =  ""; // 

  constructor(
    private socketService: ChatService,
    private route: ActivatedRoute,
    //private userService: UserService  // UserService
  ) { this.currentUserId = sessionStorage.getItem("user_id") ?? ""; }


  ngOnChanges() {

    console.log('test');
    this.LoadChat();
  }
  ngOnInit() {
    this.socketService.getNewMessage().subscribe(data => {
      console.log(data);
      this.messages.push(data);
    });
    //this.LoadChat();
  }


  LoadChat(){
    this.messages = [];
    this.socketService.leaveChatRoom(this.roomId);
    this.roomId = this.ChatId; //this.route.snapshot.paramMap.get('roomId') || '';
    if (!this.roomId) {
      console.error("roomId is missing!");
      return;
    }
    console.log("Room ID:", this.roomId);
    // get name
    this.fetchUserName(this.currentUserId);
    this.socketService.joinChatRoom(this.roomId);
    
  }
  // get user name method
  fetchUserName(userId: String) {
    // this.userService.getUser(userId).subscribe(data => {
    //   if (data && (data as any)['name']) {
    //     this.sender = (data as any)['name'];
    //   }
    //   console.log(data)
    // });
  }

  joinRoom() {
    this.socketService.joinChatRoom(this.roomId);
  }

  onSendMessage() {  
    this.socketService.sendMessage(this.roomId, this.sender, this.message);
    this.message = "";
  }
}
