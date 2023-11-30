import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  role: string | null = null;
  
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role"); 
  }
}
