import { Component, ViewChild, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';

import { Calendar, CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-load-physician-availability',
  templateUrl: './load-physician-availability.component.html',
  styleUrls: ['./load-physician-availability.component.scss']
})
export class LoadPhysicianAvailabilityComponent {

  @ViewChild('calendar') calendarComponent: any;

  ngOnInit(): void{  }


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
        title: 'My event',
        start: '2023-08-24T10:00:00', 
        end: '2023-08-24T14:00:00',   
        constraint: 'businessHours'  
      }
    ],
    businessHours: true
  };
  

}
