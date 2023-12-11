import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-load-availability',
  templateUrl: './load-availability.component.html',
  styleUrls: ['./load-availability.component.scss']
})

export class LoadAvailabilityComponent {

  email: string | null = null;
  idUser: string | null = null;
  date: Date = new Date();
  role: string | null = null;
  backendData: any; 

  constructor(private router: Router, private http: HttpClient) { 

  }
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    this.idUser = sessionStorage.getItem("idUser");
  }
  //Register avialability of the physician
  register_availability() {

    var dateReq = this.date;
    const bodyData = {
      date: dateReq,
      physician_email: this.idUser,

    };

   //POST request to create the appointments of a day, it will create for a day 30 minutes appointments blocks between 9 to 5PM 

    this.http.post("http://localhost:4000/appointments/load", bodyData).subscribe(
      (response) => {
        alert("Your availability has been succesfully registered for the date: " + this.date);
      },
      (error) => {
       alert('Error: ' + error);
      }
    );
  }
}








