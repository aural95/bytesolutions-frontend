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

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log(response);
        const token = response.data.token;
        const user = response.data.user.fullname; 
        let role = response.data.user.id_role == "655434872cdb661ebbfc9437" ? "patient" : "Undefined"; 
        this.setCookie('token', token, 2);
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("role",role);
        sessionStorage.setItem("user",user);
        this.router.navigate(['/schedule']);
      },
      (error) => {
        alert(error);
        console.error('Session Error:', error);
      }
    );
  }
  setCookie(name: string, value: any, hours: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
}
