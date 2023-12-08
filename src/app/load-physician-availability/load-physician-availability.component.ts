import { Component, ViewChild, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';

import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-load-physician-availability',
  templateUrl: './load-physician-availability.component.html',
  styleUrls: ['./load-physician-availability.component.scss']
})
export class LoadPhysicianAvailabilityComponent {

  //
  @ViewChild('calendar') calendarComponent: any;
  
  ngOnInit(): void{ 
    
    this.update();
    
   }

   constructor(private http: HttpClient){}

   
  calendarOptions: CalendarOptions = {
    aspectRatio: 1.7,
    weekends: false,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    selectable: true,
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr+'   /   Current view: ' + info.view.type);
    },
    events: [
      {
        title: 'My Event',
        start: '2023-12-01T10:00:00', 
        end: '2023-12-01T12:00:00',   
        constraint: 'businessHours' 
      }
    ],
   businessHours: true,
    
  };
  



  update(){
    console.log("entrando a update");
    console.log(this.calendarOptions.events);
    
    let physicianData = {
      "type":1,
        "physicianEmail": sessionStorage.getItem("email"),
        "isBooked":false
    };
    console.log("REVISAR");
    console.log(sessionStorage.getItem("idUser"));

    let doctorId = sessionStorage.getItem("idUser"); // Reemplaza con el ID real del médico
    let schedulesToShow: { title: string, start: string, end: string, constraint: string }[] = []; // elimine el date: string
      try {
        this.http.get(`http://localhost:4000/appointments/getAppointmentsByDoctor/${doctorId}`).subscribe((resultData:any)=>{
          //http://localhost:4000/appointments
          
          let schedules=resultData.data; 
          
          
          for(let i=0; i < schedules.length; i++){
           
            let splitedDate = schedules[i].date.split("T");  
            
  
            let showAppointments={
              title: schedules[i].is_booked ? "Booked" : "Available",
             
              start: splitedDate[0]+"T"+schedules[i].start_time+":00", 
              end: splitedDate[0]+"T"+schedules[i].end_time+":00", 
              color: schedules[i].is_booked ? 'red' : 'green',  
              constraint: 'businessHours' 
            };
  
            console.log("---------");
            console.log(showAppointments);
            schedulesToShow.push(showAppointments);
          }
          console.log("Data transformed:");
          console.log(schedulesToShow);
          this.calendarOptions.events=schedulesToShow;
          console.log("ESTO ME DARA EL RESULTADO: ");
          console.log(this.calendarOptions.events);

          
          
        });

    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  
}




 


