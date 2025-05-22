import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzGridModule,
    NzButtonModule,
    RouterModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  size: NzButtonSize = 'large';
}
