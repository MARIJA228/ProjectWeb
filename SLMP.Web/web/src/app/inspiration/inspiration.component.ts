import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inspiration',
  imports: [
    NzGridModule,
    NzButtonComponent,
    RouterModule
    
  ],
  templateUrl: './inspiration.component.html',
  styleUrl: './inspiration.component.scss'
})
export class InspirationComponent {
  size: NzButtonSize = 'large';

}
