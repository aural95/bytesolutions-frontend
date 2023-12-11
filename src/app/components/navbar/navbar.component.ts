import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input()
  customTitle!: string;
  role: string | null = null;
  user: string | null = null;

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    this.user = sessionStorage.getItem("user");
  }
}
