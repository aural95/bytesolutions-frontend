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

  isFutureDate(date: string): boolean {
    const today = new Date();
    const itemDate = new Date(date);
    const hoursToAdd = 5; // add five hours of server difference
    itemDate.setHours(itemDate.getHours() + hoursToAdd);
    return itemDate > today;
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


  cancelAppointment(id: string): void {
    //656a4745050daa1060163179
    this.appointmentService
      .cancelAppointment(id).subscribe(
        (resultData: any) => {

          if (resultData.success) {
            this.loadAppointments();
            console.log('Appointment scheduled successfully:', resultData.data);
          } else {
            console.error('Error: ' + resultData);
          }
        },
        (error) => {
          console.error('Error scheduling appointment:', error);
        }
      );
  }

  modifyAppointment(id: string): void {
    this.router.navigate(['schedule', id]);
  }

}
