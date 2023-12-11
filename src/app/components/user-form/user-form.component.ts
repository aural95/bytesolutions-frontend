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
    specialty:'',
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
      this.userToSave.role="Patient";
      this.path = '/signup';
    } else {
      this.path = '/users';
    }
  }

  onChangeDate():void{
    this.isDateModified=true;
  }

  //Function to send to the specific path after finishing
  returnToPreviousRoute(): void {
    
    let currentUrl = this.router.url; // Get the current route URL
    
    if(this.typeOfForm==="Patient"){
      currentUrl = "/";
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate back to the current route
      this.router.navigate([currentUrl]);
    });
  }

  getUserToEdit(user: any): void {
    
    this.userToSave = {
      _id:user._id,
      fullname: user.fullname,
      specialty:user.specialty,
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
  //Code executed when the admin or a user register as patient users
  
  onSubmit():void{
    this.userToSave.birthdate=new Date(this.userToSave.birthdateString); 
    

    if(this.typeOfForm==="Edit"){
      
      this.userToSave.id_role=this.roles.find(role=>role.name===this.userToSave.role);
      let userToEdit = {
        fullname: this.userToSave.fullname,
        healthcard: this.userToSave.healthcard
      };
      this.http
        .put('http://localhost:4000/users/'+this.userToSave._id,userToEdit)
        .subscribe((resultData: any) => {
          console.log(resultData);
          if (resultData) {
            window.alert("User edited");
            this.returnToPreviousRoute();
          } else {
            window.alert('Error editing user');
          }
        });
    }else{
      //verify password and retype password match
      if(this.userToSave.password!=this.userToSave.confirmPassword || (this.userToSave.confirmPassword=="" && this.userToSave.password=="")){
        window.alert("Please verify password and confirm password");
        return;
      }
      //verify gender was selected
      if(this.userToSave.gender==""){
        window.alert("Please select the gender of the user");
        return;
      }
      //verify role was selected
      if(this.userToSave.role===''){
        window.alert("Please select the role of the user");
        return;
      }
      //verify user full name was selected
      if(this.userToSave.fullname===''){
        window.alert("Please type the name of the user");
        return;
      }
      //verify the date was entered
      if(!this.isDateModified){
        window.alert("Please select the DOB of the user");
        return;
      }
      //Verify there is a healthcard number
      if(this.userToSave.healthcard===''){
        window.alert("Please type the Health Card Number of the user");
        return;
      }

      //register as patient, anyone can register as a patient
      this.userToSave.id_role=this.roles.find(role=>role.name===this.userToSave.role);
      let userToSend = {
        fullname: this.userToSave.fullname,
        email: this.userToSave.email,
        id_role: this.userToSave.id_role._id,
        specialty:this.userToSave.specialty,
        birthdate: this.userToSave.birthdate,    
        gender: this.userToSave.gender,
        healthcard: this.userToSave.healthcard,
        password: this.userToSave.password
      };
      //post request to backend
      this.http
        .post('http://localhost:4000/auth/register',userToSend)
        .subscribe((resultData: any) => {
          if (resultData.data.status) {
            window.alert("User created");
            this.returnToPreviousRoute();
          } else {
            console.log('Error creating user');
          }
        });
    }
  }
  //Get all the roles from the backend
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
