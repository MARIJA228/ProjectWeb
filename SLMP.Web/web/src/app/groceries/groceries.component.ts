import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { getISOWeek } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { differenceInDays } from 'date-fns'; // for date comparison
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

//creating the interface for the item for shopping list
interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  userId: number;
}


@Component({
  selector: 'app-groceries',
  imports: [
    NzGridModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzInputModule,
    NzButtonModule,
    NzListModule,
    NzTypographyModule,
    CommonModule
    
  ],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.scss',
})
export class GroceriesComponent implements OnInit  {
  http = inject(HttpClient);

  name: string = ''; // for input text field
  quantity: number = 1; // for input number field
  shoppingList: ShoppingItem[] = [];


  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
  size: NzButtonSize = 'large';


//implementing Oninit
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
    const userId = user.userId;
//connecting to the backend with the address 7136, and method which i have defined there, and userId depending on who is log in
    this.http.get<ShoppingItem[]>(`https://localhost:7136/api/ShoppingList/UserItems/${userId}`)
      .subscribe({
        next: (items) => this.shoppingList = items,
        error: () => alert("Failed to load shopping list") // in case of an error
      });
  }
//method for adding item
  addItem(): void {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
    const userId = user.userId;

    //req. information
    const payload: Omit<ShoppingItem, 'id'> = {
      name: this.name,
      quantity: this.quantity,
      userId
    };
//method post, which adds items, defined in backedn, pass on payload 
    this.http.post<ShoppingItem>("https://localhost:7136/api/ShoppingList/AddItem", payload)
      .subscribe({
        next: (item) => {
          this.shoppingList = [...this.shoppingList, item];
          this.name = '';
          this.quantity = 1;
        },
        error: () => alert("Failed to add item") // in case of an error
      });
  }

  //if the user wants to remove the item
  removeItem(index: number): void {
    const item = this.shoppingList[index];

    //method delete, defined in backend, passed an item depending on id 
    this.http.delete(`https://localhost:7136/api/ShoppingList/DeleteItem/${item.id}`)
      .subscribe({
        next: () => this.shoppingList.splice(index, 1),
        error: () => alert("Failed to delete item") //in case of an error 
      });
  }

  updateQuantity(index: number, value: number): void {
    this.shoppingList[index].quantity = value;
    
  }


}
