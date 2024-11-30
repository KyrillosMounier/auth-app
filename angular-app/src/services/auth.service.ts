import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SignupModel } from '../models/signup.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Your API base URL
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: SignupModel){
    return this.http.post(`${this.apiUrl}/auth/signup`, data);
  }

  login(data:LoginModel){
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

  getProtectedData(){
    return this.http
      .get(`${this.apiUrl}/`,)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }
  // Logout method
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Store JWT token in local storage
  storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  // Get the JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    // Optional: Add additional checks, such as token expiry
    return true;
  }
}
