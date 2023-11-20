import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  selectedSpecialty: string = 'All Specialties';
  physicians: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.selectedSpecialty = 'All Specialties';
    this.fetchPhysiciansBySpecialty();
  }

  onSpecialtyChange(specialty: string): void {
    this.selectedSpecialty = specialty;
    this.fetchPhysiciansBySpecialty();
  }

  fetchPhysiciansBySpecialty(): void {
    // Make an HTTP request to fetch physicians based on the selected specialty
    this.httpClient.get<any[]>(`/api/users/physicians/${this.selectedSpecialty}`).subscribe(
      (response: any[]) => {
        this.physicians = response;
      },
      (error) => {
        console.error('Error fetching physicians:', error);
      }
    );
  }
}
