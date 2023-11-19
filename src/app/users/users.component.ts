import { Component, ViewChild } from '@angular/core';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    
  @ViewChild(UserFormComponent) userForm!:UserFormComponent;
  public loadChild(): void {
    
  }
  //Variable declarations
  userList: any[]=[];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void{
    this.http
      .get('http://localhost:4000/users')
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.userList = resultData.message;
        } else {
          alert('Error');
        }
      });
  }

  userToBeEdited(user:any){
    this.userForm.getUserToEdit(user);
  }
  
}
