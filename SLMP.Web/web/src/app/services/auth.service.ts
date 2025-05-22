// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7136/api/Users'; //my backend is here, and with with address we are passing the info to it

  constructor(private http: HttpClient) {}

  signUp(signupData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post('https://localhost:7136/api/Users', signupData); //for sign up
  }
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post('https://localhost:7136/api/Users', data); //for log in
  }
}



