import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { getISOWeek } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { differenceInDays } from 'date-fns'; // for date comparison
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';



//interface for creating an pantry item with req. info 
interface PantryItem {
  id: number;
  name: string;
  quantity: number;
  expiryDate: Date;
  userId: number;
}


@Component({
  selector: 'app-organize',
  imports: [
    NzDividerModule,
    NzGridModule,
    FormsModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzInputModule,
    NzButtonModule,
    NzListModule,
    NzTypographyModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './organize.component.html',
  styleUrl: './organize.component.scss'
})



export class OrganizeComponent implements OnInit {
  date: Date | null = null;

  ingredients: PantryItem[] = [];


  http = inject(HttpClient);

  name: string = ''; // for input text field
  quantity: number = 1; // for input number field

  //implementing OnInit, passing the pantry items with userId
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
    const userId = user.userId || user.UserId;
  
    if (!userId) {
      console.warn("User not logged in");
      return;
    }
  
    this.http.get<any[]>(`https://localhost:7136/api/Pantry/UserItems/${userId}`) //method defined in backend, for getting the items bes on Id
      .subscribe({
        next: (items) => {
          this.ingredients = items.map(item => ({
            ...item,
            expiry: new Date(item.expiry) // Converting expiry string to Date object
          }));
        },
        error: (err) => {
          console.error("Failed to fetch pantry items", err);
        }
      });
  }
  

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  size: NzButtonSize = 'large';


  updateQuantity(item: any, newQuantity: number): void {
    item.quantity = newQuantity;
  }

  isExpiringSoon(date: Date): boolean {
    return differenceInDays(date, new Date()) <= 2;
  }

  //method for adding
  addItem() {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
    const userId = user.userId; 
  
    if (!userId) {
      alert("User not logged in");
      return;
    }
 
    //elements of item
    const payload = {
      name: this.name,
      quantity: this.quantity,
      expiryDate: this.date || new Date(), 
      userId: userId
    };
   //connection to my backend with the method AddItem i have created there
    this.http.post<PantryItem>("https://localhost:7136/api/Pantry/AddItem", payload)
  .subscribe({
    next: (res) => {
      alert("Item added!");
      this.ingredients.push(res); // includes the auto-generated `id`
    },
    error: () => {
      alert("Error adding item");
    }
  });

  }
   //connection to my backend with the method DeleteItem i have created there
  deleteItem(itemId: number) {
    this.http.delete(`https://localhost:7136/api/Pantry/DeleteItem/${itemId}`)
      .subscribe({
        next: () => {
          this.ingredients = this.ingredients.filter(item => item.id !== itemId);
          alert("Item deleted!");
        },
        error: () => {
          alert("Failed to delete item");
        }
      });
  }


}
