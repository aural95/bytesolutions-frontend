import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
  physicianEmail: string = '';
  physicianList: string[] = [];
  submitButtonEnabled: boolean = true;
  patientEmail: string = ' ';
  appointmentSelected: string = ' ';

  constructor(private httpClient: HttpClient) {
    this.physicians = [];
  }

  ngOnInit() {
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
  onDateChange(date: string){
    this.dateSelected = date;
    try {
      this.fetchAppointmentsByDate();      
    } catch (error) {
      console.error(error);
    }
  }
  async fetchAppointmentsByDate() {
    console.log('Fetching available appointments by date:', this.dateSelected);
    console.log(this.dateSelected);
    console.log(this.physicianSelected)
    try {
      const response = await this.httpClient.get<any[]>(`http://localhost:4000/appointments/getAllAvailabilityByDoctor/${this.physicianSelected}/${this.dateSelected}`).toPromise();
      this.appointments = response || [];
      console.log(this.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  //Schedule appointment section: 

 scheduleAppointment(): void {
    if (!this.dateSelected || !this.startTimeSelected || !this.physicianSelected) {
      console.error('Please fill out all the fields!');
      return;
    }
    const appointmentData = {
      is_booked: true,
      patient_email: "", // Valor del id del paciente logueado 
    };
    this.httpClient.put<any>(`http://localhost:4000/appointments/schedule/${this.appointmentSelected}`, appointmentData)
      .subscribe(
        response => {
          console.log('Appointment scheduled successfully:', response);
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

   cancelAppointment(): void {
    const appointmentData = {
      patient_email: "", // Valor del id del paciente logueado 
    };
    this.httpClient.put<any>(`/appointments/cancel/${this.appointmentSelected}`, appointmentData)
      .subscribe(
        response => {
          console.log('Appointment scheduled successfully:', response);
        },
        error => {
          console.error('Error scheduling appointment:', error);
        }
      );
  } 
}
