import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  path: string = '';
  roles: any[] = [];
  isDateModified: boolean=false;

  userToSave = {
    _id:'',
    fullname: '',
    email: '',
    id_role: {
      _id:'',
      name: ''
    },
    role:'',
    birthdate: new Date(),    
    gender: '',
    healthcard: '',
    password: '',
    confirmPassword: '',
    birthdateString:''
  };
  

  

  @Input() typeOfForm!: string;
  @Input() user!: any;

  constructor(private http: HttpClient,
     private router: Router
  ) {}
  //Set the path to return when the user fill the form
  ngOnInit(): void {
    this.getRoleList();

    if (this.typeOfForm === 'Patient') {
      this.path = '/signup';
    } else {
      this.path = '/users';
    }
  }

  onChangeDate():void{
    this.isDateModified=true;
    console.log(this.userToSave.birthdateString);
  }

  //Function to send to the specific path after finishing
  returnToPreviousRoute(): void {
    this.router.navigate([this.path]);
  }

  getUserToEdit(user: any): void {
    
    this.userToSave = {
      _id:user._id,
      fullname: user.fullname,
      email: user.email,
      id_role: {
        _id: user.id_role._id,
        name: user.id_role.name
      },
      role:user.id_role.name,
      birthdate: new Date(user.birthdate),    
      gender: user.gender,
      healthcard: user.healthcard,
      password: "",
      confirmPassword: '',
      birthdateString:''
    };
    this.userToSave.birthdateString = this.userToSave.birthdate.toISOString().split('T')[0];
  }

  onSubmit():void{
    this.userToSave.birthdate=new Date(this.userToSave.birthdateString); 
    console.log(this.userToSave);
    if(this.userToSave.password!=this.userToSave.confirmPassword || (this.userToSave.confirmPassword=="" && this.userToSave.password=="")){
      window.alert("Please verify password and confirm password");
      return;
    }
    if(this.userToSave.gender==""){
      window.alert("Please select the gender of the user");
      return;
    }
    if(this.userToSave.role===''){
      window.alert("Please select the role of the user");
      return;
    }
    if(this.userToSave.fullname===''){
      window.alert("Please type the name of the user");
      return;
    }
    if(!this.isDateModified){
      window.alert("Please select the DOB of the user");
      return;
    }
    if(this.userToSave.healthcard===''){
      window.alert("Please type the Health Card Number of the user");
      return;
    }

    if(this.typeOfForm==="Patient" || this.typeOfForm==="Admin"){
      //register as patient, anyone can register aas patient
      this.userToSave.id_role=this.roles.find(role=>role.name===this.userToSave.role);
      let userToSend = {
        fullname: this.userToSave.fullname,
        email: this.userToSave.email,
        id_role: this.userToSave.id_role._id,
        birthdate: this.userToSave.birthdate,    
        gender: this.userToSave.gender,
        healthcard: this.userToSave.healthcard,
        password: this.userToSave.password
      };
      this.http
        .post('http://localhost:4000/auth/register',userToSend)
        .subscribe((resultData: any) => {
          console.log(resultData);
          if (resultData.data.status) {
            window.alert("User created");
            this.returnToPreviousRoute();
          } else {
            console.log('Error creating user');
          }
        });
    }
    


    
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
