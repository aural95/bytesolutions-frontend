import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//

//

@Component({
  selector: 'app-load-availability',
  templateUrl: './load-availability.component.html',
  styleUrls: ['./load-availability.component.scss']
})
//
export class LoadAvailabilityComponent {

  email: string | null = null;
  date: Date = new Date();
  //
  backendData: any; // Variable para almacenar los datos del backend
  //
  //libros: any[] = []; // variable para almacenar los libros
  //
  constructor(private router: Router, private http: HttpClient){}
  ngOnInit(): void {
    console.log("entrando al OnInit")
    this.email = sessionStorage.getItem("email");

    //
    // Llamada a la función para probar la conexión al backend
    //this.testBackendConnection();

    // Llamada a la funcion para obtener libros desde el backend
    //this.obtenerLibros();
  }

  //
  // Función para probar la conexión al backend
  /*testBackendConnection(): void {
    const backendURL = 'http://localhost:5000';  // Reemplaza con la URL de tu backend

    this.http.get(`${backendURL}/ruta-de-prueba`).subscribe(
      (response) => {
        console.log('Conexión exitosa al backend:', response);
        this.backendData = response; // Almacena los datos del backend en la variable
      },
      (error) => {
        console.error('Error al conectar al backend:', error);
      }
    );
  }*/

  


//
register_availability(): void {
  const backendURL = 'http://localhost:4000';

  //var emailReq = this.email; //this.email
  var dateReq = this.date;
  const bodyData = {
    physicianEmail: 'onvivr',//this.email,
    date: dateReq,//this.date.toISOString(),
    
    // ----------------Quitar estos valores porque no son necesarios---------------------------------------------------------
    // Yo hago el get----------------------------------
    /*slots: [
      {
        startTime: '09:00 AM',
        endTime: '16:30 PM',
        isBooked: true
      }
      // Agrega más slots si es necesario
    ]*/
  };
  console.log(this.email);
  console.log(this.date);
  alert("Your availability has been succesfully registered for the date: "+this.date);



  this.http.post(`${backendURL}/appointments/load`, bodyData).subscribe(
    (response) => {
      console.log('Solicitud POST exitosa:', response);
      
      // Realiza acciones adicionales después de la solicitud POST si es necesario
    },
    (error) => {
      console.error('Error en la solicitud POST:', error);
    }
  );
}
}



  




