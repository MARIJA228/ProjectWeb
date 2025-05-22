import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    RouterModule,
    NzFormModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;


  private authService = inject(AuthService);
  private router = inject(Router);

  http = inject(HttpClient);
  fb = inject(FormBuilder);

//implementing Oninit with validators in log in forn
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


//method onregister for of log in form where he checks and pushes the values to the backend 
    onRegister() {
      if (this.loginForm.valid) {
        const registerObj = {
          UserId: 0,
          UserName: this.loginForm.value.username,
          Password: this.loginForm.value.password
        };
    //address to the backend with the method Login i have created there, passing registerObj
        this.http.post("https://localhost:7136/api/Users/Login", registerObj) 
          .subscribe({
            next: (res) => {
              alert("Login successful!"); //if successful
              localStorage.setItem('userApp', JSON.stringify(res));
              this.router.navigateByUrl("/welcome");
              this.loginForm.reset();
            },
            error: (err) => {
              if (err.status === 401) {
                alert("Wrong credentials"); //in case of wrong info
              } else {
                alert("An error occurred. Please try again."); // or else something was wrong 
              }
            }
          });
      } else {
        this.loginForm.markAllAsTouched();
      }
    }
    
    
  }
 


