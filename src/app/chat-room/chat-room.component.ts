import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service'


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  @Input() ChatId: string = "";
  sender: string = '';
  message: string = '';
  roomId: string = '';
  appointment: any;
  messages: any[] = [];
  role: string | null = null;
  isEnabled: boolean = true;
  // get user id
  currentUserId: string = ""; // 

  constructor(private socketService: ChatService, private appointmentService: AppointmentService, private route: ActivatedRoute) { //1
    this.currentUserId = sessionStorage.getItem("idUser") ?? "";
    this.sender = this.currentUserId;
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
    });
  }


  ngOnChanges() {
    this.loadChat();
  }

  ngOnInit() {
    //2
    this.role = sessionStorage.getItem("role");
    this.socketService.getNewMessage().subscribe(data => {
      this.messages.push(data);
    });
    this.loadAppointment();
    this.loadChat();
  }


  loadChat() {
    this.appointmentService.getAllMessagesByAppointment(this.roomId)
    .subscribe(
      (resultData: any) => {
        if (resultData.success) {
          this.messages = resultData.data;
          console.log(resultData);
        } else {
          console.error('Error: ' + resultData.message);
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );


    this.socketService.leaveChatRoom(this.roomId);
    if (!this.roomId) {
      console.error("roomId is missing!");
      return;
    }
    this.socketService.joinChatRoom(this.roomId);
  }

  joinRoom() {
    this.socketService.joinChatRoom(this.roomId);
  }

  onSendMessage() {
    if (this.message !== "") {
      this.socketService.sendMessage(this.roomId, this.sender, this.message);
      this.postMessage();
      this.message = "";
    }
  }

  postMessage() {
    const msg = {
      id_appointment: this.roomId,
      user_email: this.sender,
      text: this.message,
    };

    this.appointmentService.postMessage(msg)
      .subscribe(
        (resultData: any) => {
          if (resultData.success) {
            //console.log(this.resultData);
          } else {
            console.error('Error: ' + resultData.message);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );

  }

  loadAppointment(): void {
    this.appointmentService
      .getAppointment(this.roomId).subscribe(
        (resultData: any) => {
          if (resultData.success) {
            this.appointment = resultData.data[0];
            if (!this.isToday(this.appointment.date)) {
              this.isEnabled = false;
            }

            console.log(this.appointment);
          } else {
            console.error('Error: ' + resultData.message);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }

  isToday(date: string): boolean {
    const today = new Date();
    const itemDate = new Date(date);
    const hoursToAdd = 5; // add five hs of server difference
    itemDate.setHours(itemDate.getHours() + hoursToAdd);
    return (
      today.getFullYear() === itemDate.getFullYear() &&
      today.getMonth() === itemDate.getMonth() &&
      today.getDate() === itemDate.getDate()
    );
  }

}
