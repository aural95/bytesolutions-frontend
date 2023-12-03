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
   //this.obtenerEventos();
    
   }

   constructor(private http: HttpClient){}

   
  calendarOptions: CalendarOptions = {
    aspectRatio: 1.7,
    weekends: false,
    initialView: 'dayGridMonth',
    //
    //events: this.events,
    //
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
        //date: '2023-11-22',
       // color: '#0000FF',// elimino los
        
        start: '2023-12-01T10:00:00', 
        end: '2023-12-01T12:00:00',   
        constraint: 'businessHours' // DESCOMENTE ESTO
      }
    ],
   businessHours: true,
    
  };
  



  update(){
    console.log("entrando a update");
    
    let physicianData = {
      "type":1,
        "physicianEmail": "", //sessionStorage.getItem("email"),
        "isBooked":false
    };
    let schedulesToShow: { title: string, start: string, end: string, constraint: string }[] = []; // elimine el date: string
      try {
        this.http.get("http://localhost:4000/appointments").subscribe((resultData:any)=>{
          
          //console.log("ESTO ES RESULDATA:");
          //console.log(resultData);// modifique el .data
          let schedules=resultData; // aqui tambien lo modifique
          
          
          for(let i=0; i < schedules.length; i++){
           // console.log(schedules.length);
            //console.log(schedules[i].date);
            let splitedDate = schedules[i].date.split("T");  // le agregue el .split();
            
  
            let showAppointments={
              title: "Available",
              // date: splitedDate,        comente esto 
              start: splitedDate[0]+"T"+schedules[i].start_time+":00", 
              end: splitedDate[0]+"T"+schedules[i].end_time+":00",   // elimino los
              constraint: 'businessHours' 
            };
  
            console.log("---------");
            console.log(showAppointments);
            schedulesToShow.push(showAppointments);
          }
          console.log("Data transformed:");
          console.log(schedulesToShow);
          this.calendarOptions.events=schedulesToShow;
          
        });

        // Traer citas de los pacientes
        /*physicianData.isBooked=true;
      this.http.put("http://localhost:4000/appointments/schedule/:id", physicianData).subscribe((resultData:any)=>{
        console.log(resultData);  

        let schedules2=resultData.message;
        for(let i=0; i < schedules2.length; i++){
          let splitedDate2 = schedules2[i].Date.split("T");  

          let showAppointments={
            title: schedules2[i].patientEmail,
            start: splitedDate2[0]+"T"+schedules2[i].startTime+":00", 
            end: splitedDate2[0]+"T"+schedules2[i].endTime+":00",   
            constraint: 'businessHours', 
            backgroundColor: 'red'
          };
          schedulesToShow.push(showAppointments);
        }
        console.log("Data transformed2:");
        console.log(schedulesToShow);
        this.calendarOptions.events=schedulesToShow;
      });*/

    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  
}




 


// Función para obtener eventos desde el backend
  /*obtenerEventos(): void {
    const backendURL = 'http://localhost:5000'; // Reemplaza con la URL de tu backend

    this.http.get<any[]>(`${backendURL}/books`).subscribe(
      (response) => {
        console.log('Eventos cargados exitosamente:', response);

        // Verifica si la propiedad 'data' es un array antes de asignar a eventos
        if (Array.isArray(response)) {
          const eventos = response.map(libro => ({
            title: 'Disponible',
            start: libro.date,
            end: libro.date,
            constraint: 'businessHours'
          }));

          // Actualiza los eventos del calendario
          this.calendarOptions.events = eventos;
          this.calendarComponent.getApi().refetchEvents();
        } else {
          console.error('Error: La respuesta no es un array/////');
        }
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
      }
    );
  }*/