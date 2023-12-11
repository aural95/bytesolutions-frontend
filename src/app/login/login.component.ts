import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}
  //Login function to authenticate a user into the system and verify their role
  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {

        const token = response.data.token;
        const user = response.data.user.fullname; 
        const idUser = response.data.user._id;
        let role = response.data.user.id_role
        switch (role) {
          case "655434872cdb661ebbfc9437":
            role = "patient"
            break;
          case "655442cd2e26f0a767177f34":
            role = "physician"
            break;
          case "655442e82e26f0a767177f35":
            role = "staff"
            break;
          case "6567fb82d7a61f4dc8646091":
            role = "admin"
            break;
          default:
            break;
        }
        this.setCookie('token', token, 2);
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("role",role);
        sessionStorage.setItem("user",user);
        sessionStorage.setItem("idUser",idUser);
        this.router.navigate(['/home']);
      },
      (error) => {
        //Get the error message from the backend and show it to the user
        alert(error.error.error);
      }
    );
  }
  setCookie(name: string, value: any, hours: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
}
