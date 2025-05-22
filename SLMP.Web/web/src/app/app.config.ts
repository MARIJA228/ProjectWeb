import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {HomeOutline,
  TeamOutline,
  BankOutline,
  ShopOutline,
  VideoCameraOutline,
  ProfileOutline} from '@ant-design/icons-angular/icons';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimations(), 
    provideHttpClient(),
    {
      provide: NZ_ICONS,
      useValue: [
        HomeOutline,
        TeamOutline,
        BankOutline,
        ShopOutline,
        VideoCameraOutline,
        ProfileOutline
      ]
    }
  ]
};
