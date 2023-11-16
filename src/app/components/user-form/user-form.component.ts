import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  
  path:string="";
  roles:any[]=[];
  
  @Input()
  typeOfForm!: string;
  
  

  constructor(
    private http: HttpClient,
    private router: Router,
  ){
    
  };
  //Set the path to return when the user fill the form
  ngOnInit(): void {
    this.getRoleList();
    console.log(this.roles);
    if(this.typeOfForm==="Patient"){
      this.path="/signup";
    }else{
      this.path="/users";
    }
  };

  

  //Function to send to the specific path after finishing 
  returnToPreviousRoute():void{
    this.router.navigate([this.path]);
  };

  getRoleList(){
    let bodyData = {};
    this.http
      .get('http://localhost:4000/roles')
      .subscribe((resultData: any) => {
        if(resultData.status){
          console.log(resultData);
          this.roles=resultData.message;
        }
        else{
          console.log("Error getting roles");
        }
      });
  };

}
