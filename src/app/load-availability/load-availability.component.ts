import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-availability',
  templateUrl: './load-availability.component.html',
  styleUrls: ['./load-availability.component.scss']
})
export class LoadAvailabilityComponent {
  role: string | null = null;
  
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");    
  }
}
