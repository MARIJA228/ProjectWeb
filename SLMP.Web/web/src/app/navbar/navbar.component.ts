import { Component, OnInit } from '@angular/core';
import { NzLayoutModule} from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzSiderComponent } from 'ng-zorro-antd/layout';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    RouterModule,
    CommonModule,            
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}


  //logic for having log in and log out option dependig on if the user is currently logged in our out
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
    console.log('User in localStorage:', user); 
    return !!user.userId;
  }

  logout(): void {
    localStorage.removeItem('userApp');
    this.router.navigate(['/login']);  //if not navigate me here
  }
}