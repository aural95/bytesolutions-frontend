import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private server;
  constructor(private http: HttpClient) { 
    this.server = "http://localhost:4000/appointments";
  }

  getAppointmentsByPatient(patientId: string): Observable<any> {
    return this.http.get(`${this.server}/getAppointmentsPatient/${patientId}`);
  }
  getAppointmentsByDoctor(doctorId: string): Observable<any> {
    return this.http.get(`${this.server}/getAppointmentsByDoctor/${doctorId}`);
  }
  getAppointments(): Observable<any> {
    return this.http.get(`${this.server}/getAppointments`);
  }
  getAppointment(appointmentId: string): Observable<any> {
    return this.http.get(`${this.server}/getAppointment/${appointmentId}`);
  }
  getAllMessagesByAppointment(appointmentId: string): Observable<any> {
    return this.http.get(`${this.server}/getAllMessages/${appointmentId}`);
  }
  postMessage(message: any): Observable<any> {
    return this.http.post(`${this.server}/saveMessage`, message);
  }
  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http.put(`${this.server}/cancel/${appointmentId}`, {});
  }

}
