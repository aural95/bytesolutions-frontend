import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-load-availability',
  templateUrl: './load-availability.component.html',
  styleUrls: ['./load-availability.component.scss']
})
export class LoadAvailabilityComponent {

  email: string | null = null;
  date: Date= new Date();


}

