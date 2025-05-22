import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule
  ],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {

}
