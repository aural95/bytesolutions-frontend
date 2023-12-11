
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  patientName: string | null = null;
  idUser: string | null = null;
  appointmentSelected: string = ' ';
  role: string | null = null;
  appointmentId: string = '';

  constructor(private httpClient: HttpClient, private appointmentService: AppointmentService, private router: Router, private route: ActivatedRoute) {
    this.physicians = [];
  }

  /* Get initial vaues of the variables declared*/
    ngOnInit() {
    this.role = sessionStorage.getItem("role");   
    this.patientName = sessionStorage.getItem("user");   
    this.idUser = sessionStorage.getItem("idUser");  
    this.selectedSpecialty = 'All Specialties';
    this.fetchPhysiciansBySpecialty();
    this.startTimeSelected = ' ';
    this.physicianSelected = ' ';
    this.route.params.subscribe((params) => {
      this.appointmentId = params['id'];
      console.log(this.appointmentId);
    });
    this.appointments.forEach((item) => {
      if (!this.physicianList.includes(item.physicianEmail)) {
        this.physicianList.push(item);
      }
    });
  }

  // Get physicians with an specific specialty: 

  onSpecialtyChange(specialty: string): void {
    this.selectedSpecialty = specialty;
    try {
      this.fetchPhysiciansBySpecialty();
    } catch (error) {
      console.error(error);
    }
  }

  /* Call to backend to search physicians in the users table that has the same specialty*/
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
  onDateChange(event: any) {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.dateSelected = selectedDate;
    try {
      this.fetchAppointmentsByDate();
    } catch (error) {
      console.error(error);
    }
  }

  //Get all the appointments available
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


 //Schedule appointment form validation and put request to backend to schedule the appointment
 scheduleAppointment(): void {
    if (!this.dateSelected || !this.startTimeSelected || !this.physicianSelected) {
      console.error('Please fill out all the fields!');
      return;
    }

    if (this.appointmentId != null && this.appointmentId != undefined) {
      this.cancelAppointment(this.appointmentId);
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
  cancelAppointment(id: string): void {
    this.appointmentService
      .cancelAppointment(id).subscribe(
        (resultData: any) => {

          if (resultData.success) {
            console.log('Appointment canceled successfully:', resultData.data);
          } else {
            console.error('Error: ' + resultData);
          }
        },
        (error) => {
          console.error('Error scheduling appointment:', error);
        }
      );
  }



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
