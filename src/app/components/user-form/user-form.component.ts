import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  path: string = '';
  roles: any[] = [];
  email: string = '';
  id_role: any = {name:""};
  fullname: string = '';
  birthdate: Date =  new Date;
  gender: string = '';
  healthcard: string = '';
  password: string = '';
  createdAt: Date | undefined;
  updatedAt: Date | undefined;

  @Input() typeOfForm!: string;
  @Input() user!: any;

  constructor(private http: HttpClient, private router: Router) {}
  //Set the path to return when the user fill the form
  ngOnInit(): void {
    this.getRoleList();

    console.log(this.roles);
    if (this.typeOfForm === 'Patient') {
      this.path = '/signup';
    } else {
      this.path = '/users';
    }
  }

  //Function to send to the specific path after finishing
  returnToPreviousRoute(): void {
    this.router.navigate([this.path]);
  }

  getUserToEdit(user: any): void {
    this.email = user.email;
    this.id_role = user.id_role;
    this.fullname = user.fullname;
    this.birthdate = new Date(user.birthdate);    
    this.gender = user.gender;
    this.healthcard = user.healthcard;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  save():void{

  }

  getRoleList():void {
    let bodyData = {};
    this.http
      .get('http://localhost:4000/roles')
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.roles = resultData.message;
        } else {
          console.log('Error getting roles');
        }
      });
  }
}
