import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AppointmentService]
})


export class HomeComponent {
  constructor(private appointmentService: AppointmentService, private http: HttpClient, private router: Router) { }
  appointments: any;
  role: string | null = null;
  user: string | null = null;

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    this.user = sessionStorage.getItem("idUser");
    this.loadAppointments();
  }
  //Function to call the appropiate get method according to the role of the user
  loadAppointments(): void {
    switch (this.role?.toLowerCase()) {
      case "patient":
        this.getAppointmentsByPatient(this.user == null ? '' : this.user);
        break;
      case "physician":
        this.getAppointmentsByDoctor(this.user == null ? '' : this.user);
        break;
      case "admin":
        this.getAppointments();
        break;
    }
  }
  //Get all the appointments regardless the status, this view is for staff members or admin user
  getAppointments(): void {
    this.appointmentService
      .getAppointments().subscribe(
        (resultData: any) => {
          if (resultData.success) {
            this.appointments = resultData.data;
            console.log(resultData.appointments);
          } else {
            console.error('Error: ' + resultData.message);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  //Retrieve from the backend the appointments  for the patient: only shows the appointments that this patient booked
  getAppointmentsByPatient(patientId: string): void {
    this.appointmentService
      .getAppointmentsByPatient(patientId).subscribe(
        (resultData: any) => {
          if (resultData.success) {
            this.appointments = resultData.data;
            console.log(resultData.appointments);
          } else {
            console.error('Error: ' + resultData.message);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  //Retrieve from the backend the appointments  for the physician
  getAppointmentsByDoctor(patientId: string): void {
    this.appointmentService
      .getAppointmentsByDoctor(patientId).subscribe(
        (resultData: any) => {
          if (resultData.success) {
            this.appointments = resultData.data;
            console.log(resultData.appointments);
          } else {
            console.error('Error: ' + resultData.message);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }

  //Compare if the appointment is before the current date
  isPastDate(date: string): boolean {
    const today = new Date();
    const itemDate = new Date(date);
    const hoursToAdd = 5; // add five hours of server difference
    itemDate.setHours(itemDate.getHours() + hoursToAdd);

    // Compare only year, month, and day
    return (
      itemDate.getFullYear() < today.getFullYear() ||
      (itemDate.getFullYear() === today.getFullYear() &&
        (itemDate.getMonth() < today.getMonth() ||
          (itemDate.getMonth() === today.getMonth() && itemDate.getDate() < today.getDate())))
    );
  }
  //Compare if the appointment is after the current date
  isFutureDate(date: string): boolean {
    const today = new Date();
    const itemDate = new Date(date);
    const hoursToAdd = 5; // add five hours of server difference
    itemDate.setHours(itemDate.getHours() + hoursToAdd);
    return itemDate > today;
  }
  //Compare if the appointment is in the current date
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

  //Cancel an appointment
  cancelAppointment(id: string): void {
    this.appointmentService
      .cancelAppointment(id).subscribe(
        (resultData: any) => {

          if (resultData.success) {
            this.loadAppointments();
            window.alert('Appointment scheduled successfully');
          } else {
            window.alert('Error: ' + resultData);
          }
        },
        (error) => {
          window.alert('Error scheduling appointment:' + error);
        }
      );
  }

  modifyAppointment(id: string): void {
    this.router.navigate(['schedule', id]);
  }

}
