import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userRole: string | null = null;
  
  ngOnInit(): void {
    
    this.userRole = sessionStorage.getItem("role"); 
  }

  constructor(private authService: AuthService, private router: Router) {}
  //Call authservice.logout to logout the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
