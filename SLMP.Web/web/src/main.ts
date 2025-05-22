import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {NZ_ICONS} from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  TeamOutline,
  BankOutline,
  ShopOutline,
  VideoCameraOutline,
  ProfileOutline
} from '@ant-design/icons-angular/icons';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: NZ_ICONS, useValue: [HomeOutline, TeamOutline, BankOutline, ShopOutline, VideoCameraOutline, ProfileOutline] },
    { provide: NZ_I18N, useValue: en_US },
    ...appConfig.providers  // 
  ]
}).catch(err => console.error(err));


/*bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/
