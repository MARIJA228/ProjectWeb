import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';




@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    NzInputModule,
    NzToolTipModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  //just for the form
  private fb = inject(FormBuilder);
  form = this.fb.group({ comment: this.fb.control('', [Validators.maxLength(100)]) });
  size: NzButtonSize = 'large';

}
