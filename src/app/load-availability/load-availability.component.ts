import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-load-availability',
  templateUrl: './load-availability.component.html',
  styleUrls: ['./load-availability.component.scss']
})
//
export class LoadAvailabilityComponent {

  email: string | null = null;
  date: Date = new Date();
  
  backendData: any; // Variable para almacenar los datos del backend
  
  constructor(private router: Router, private http: HttpClient){}
  ngOnInit(): void {
    console.log("entrando al OnInit")
    this.email = sessionStorage.getItem("email");

  
  }
  


register_availability() {

  //var emailReq = this.email; //this.email
  var dateReq = this.date;
  const bodyData = {
    date: dateReq,
    physician_email: "656bc353d75738e4b27da1c6",//this.email,
  
  };
  console.log(this.email);
  console.log(this.date);
  alert("Your availability has been succesfully registered for the date: "+this.date);



  this.http.post("http://localhost:4000/appointments/load", bodyData).subscribe(
    (response) => {
      console.log('Solicitud POST exitosa:', response);
      
    },
    (error) => {
      console.error('Error en la solicitud POST:', error);
    }
  );
}
}



  




