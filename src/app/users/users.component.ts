import { Component, ViewChild } from '@angular/core';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { Router } from '@angular/router';
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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
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

  deleteUser(_id:string){
    this.http
    .delete('http://localhost:4000/users/'+_id)
    .subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData._id===_id) {
        window.alert("User deleted");
        this.getUsers;
        this.reloadComponent;
      } else {
        window.alert('Error');
      }
    });
  }

  reloadComponent() {
    const currentUrl = this.router.url; // Get the current route URL
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate back to the current route
      this.router.navigate([currentUrl]);
    });
  }
}
