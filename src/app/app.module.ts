import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { LoadAvailabilityComponent } from './load-availability/load-availability.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    ScheduleAppointmentComponent,
    LoadAvailabilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
