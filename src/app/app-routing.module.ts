import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { LoadAvailabilityComponent } from './load-availability/load-availability.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

import { LoadPhysicianAvailabilityComponent } from './load-physician-availability/load-physician-availability.component';
//routes defined for the project
const routes: Routes = [
  {path: '', component:LoginComponent },
  {path: 'home', component:HomeComponent },
  {path: 'login', component:LoginComponent },
  {path: 'users', component:UsersComponent},
  {path: 'users/adminregister', component:UserRegistrationComponent },
  {path: 'schedule', component:ScheduleAppointmentComponent },
  {path: 'schedule/:id', component: ScheduleAppointmentComponent },
  {path: 'load', component:LoadPhysicianAvailabilityComponent },
  {path: 'patient-register',component:PatientRegisterComponent},
  {path: 'chat-room',component:ChatRoomComponent},
  {path: 'chat-room/:id',component:ChatRoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
