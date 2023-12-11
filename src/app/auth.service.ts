import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/auth/login';

  constructor(private http: HttpClient) {}
  //Function to authenticate a user
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials);
  }
  //Function to verify if a user is authenticated
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem("token");
    return !!token;
  }
  //Function to logout a user
  logout(): void {
    sessionStorage.clear();
    document.cookie = `${"token"}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}
