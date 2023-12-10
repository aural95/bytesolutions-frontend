
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment.service'

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})

export class ScheduleAppointmentComponent implements OnInit {
  selectedSpecialty: string = 'All Specialties';
  physicians: any[] = [];
  appointments: any[] = [];
  dateSelected: string = ' ';
  startTimeSelected: string = ' ';
  physicianSelected: string = ' ';
  physicianEmail: string | null = null;;
  physicianList: string[] = [];
  submitButtonEnabled: boolean = true;
  patientName: string  | null = null;
  idUser: string  | null = null;
  appointmentSelected: string = ' ';
  role: string | null = null;
  
  constructor(private httpClient: HttpClient, private appointmentService: AppointmentService, private router: Router) {
    this.physicians = [];
  }

  ngOnInit() {
    this.role = sessionStorage.getItem("role");   
    this.patientName = sessionStorage.getItem("user");   
    this.idUser = sessionStorage.getItem("idUser");  
    this.selectedSpecialty = 'All Specialties';
    this.fetchPhysiciansBySpecialty();
    this.startTimeSelected = ' ';
    this.physicianSelected = ' ';
    this.appointments.forEach((item) => {
      if (!this.physicianList.includes(item.physicianEmail)) {
        this.physicianList.push(item);
      }
    });
  }

  // Specialty filter: 

  onSpecialtyChange(specialty: string): void {
    this.selectedSpecialty = specialty;
    try {
      this.fetchPhysiciansBySpecialty();      
    } catch (error) {
      console.error(error);
    }
  }

  async fetchPhysiciansBySpecialty() {
    console.log('Fetching physicians for specialty:', this.selectedSpecialty);
    try {
      const response = await this.httpClient.get<any[]>(`http://localhost:4000/users/physicians/${this.selectedSpecialty}`).toPromise();
      this.physicians = response || [];
      console.log(this.physicians);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    }
  }

// Fetching appointments by date:
  onDateChange(event: any){
    const selectedDate = (event.target as HTMLInputElement).value;
    this.dateSelected = selectedDate;
    try {
      this.fetchAppointmentsByDate();      
    } catch (error) {
      console.error(error);
    }
  }


  fetchAppointmentsByDate(): void {
        this.appointmentService
          .fetchAppointmentsByDate(this.physicianSelected, this.dateSelected).subscribe(
            (resultData: any) => {
              
              if (resultData.success) {
                this.appointments = resultData.data;
                console.log('Appointments retrieved', resultData.data);
              } else {
                console.error('Error: ' + resultData);
              }
            },
            (error) => {
              console.error('Error:', error);
            }
          );
      }


 //Schedule appointment section: 
 scheduleAppointment(): void {
    if (!this.dateSelected || !this.startTimeSelected || !this.physicianSelected) {
      console.error('Please fill out all the fields!');
      return;
    }
    const appointmentData = {
      is_booked: true,
      patient_email: this.idUser, 
    };
    
    this.httpClient.put<any>(`http://localhost:4000/appointments/schedule/${this.appointmentSelected}`, appointmentData)
      .subscribe(
        response => {
          console.log('Appointment scheduled successfully:', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error scheduling appointment:', error);
        }
      );
   }

   // Cancel appointments 
   async fetchAllPatientAppointments() {
    console.log('Fetching all appointments for this patient', this.appointmentSelected);
    try {
      const response = await this.httpClient.get<any[]>(`/appointments/getAppointmentsPatient/${this.appointmentSelected}`).toPromise();
      this.appointments = response || [];
      console.log(this.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }
}
