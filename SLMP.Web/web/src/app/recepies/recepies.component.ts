import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonComponent} from 'ng-zorro-antd/button';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-recepies',
  imports: [
    NzGridModule,
    NzButtonComponent
  ],
  templateUrl: './recepies.component.html',
  styleUrl: './recepies.component.scss'
})
export class RecepiesComponent {
  size: NzButtonSize = 'large';

}
