import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Subject, Observable, Observer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterModule } from '@angular/router';

import { AuthService } from '../services/auth.service'; // adjust the path if needed
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  http = inject(HttpClient);
  fb = inject(FormBuilder);

  //implementing the sign up form with validators with 3 req. properties
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  //creating the user, and userId is being added by the order in which the user is created
  registerObj: any = {
        UserId : 0,
        UserName : "",
        Password : "",
        Email : "",
    }

    //on register method connected to the form
    onRegister() {
      if (this.signupForm.valid) {
        const registerObj = {
          UserId: 0,
          UserName: this.signupForm.value.username,
          Email: this.signupForm.value.email,
          Password: this.signupForm.value.password
        };

    //my backend is on 7136, and the method I have defined is called CreateNewUser thats why the address, and we are passing the registerObj to it 
        this.http.post("https://localhost:7136/api/Users/CreateNewUser", registerObj) 
          .subscribe({
            next: (res) => {
              alert("Registration successful!");
              this.signupForm.reset();
            },
            error: (err) => {
              if (err.status === 500) {
                alert("Username already exists."); //not allowing 2 users with same name
              } else {
                alert("An error occurred. Please try again.");
              }
            }
          });
      } else {
        this.signupForm.markAllAsTouched();
      }
    }
  }





