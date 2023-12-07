import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem("token");
    return !!token;
  }

  logout(): void {
    sessionStorage.clear();
    document.cookie = `${"token"}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}
