import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { LoadAvailabilityComponent } from './load-availability/load-availability.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:LoginComponent },
  {path: 'home', component:HomeComponent },
  {path: 'login', component:LoginComponent },
  {path: 'schedule', component:ScheduleAppointmentComponent },
  {path: 'load', component:LoadAvailabilityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
