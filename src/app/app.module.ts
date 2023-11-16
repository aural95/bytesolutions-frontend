import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { LoadAvailabilityComponent } from './load-availability/load-availability.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    ScheduleAppointmentComponent,
    LoadAvailabilityComponent,
    UsersComponent,
    NavbarComponent,
    UserRegistrationComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
