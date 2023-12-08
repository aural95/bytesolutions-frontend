import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
  idUser: string | null = null;
  date: Date = new Date();
  role: string | null = null;
  backendData: any; // Variable para almacenar los datos del backend
  
  constructor(private router: Router, private http: HttpClient){}
  ngOnInit(): void {
    console.log("entrando al OnInit")
    this.role = sessionStorage.getItem("role");   
    this.idUser = sessionStorage.getItem("idUser");

  
  }
  


register_availability() {

  //var emailReq = this.email; //this.email
  var dateReq = this.date;
  const bodyData = {
    date: dateReq,
    physician_email: this.idUser,
  
  };
  console.log("this.idUser");
  console.log(this.idUser);
  
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



  




