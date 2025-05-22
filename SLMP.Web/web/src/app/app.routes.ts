import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { InspirationComponent } from './inspiration/inspiration.component';
import { RecepiesComponent } from './recepies/recepies.component';
import { GroceriesComponent } from './groceries/groceries.component';
import { OrganizeComponent } from './organize/organize.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClient } from '@angular/common/http';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'welcome' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inspo', component: InspirationComponent },
    { path: 'recepies', component: RecepiesComponent},
    { path: 'groceries', component: GroceriesComponent },
    { path: 'organize', component: OrganizeComponent },
    { path: 'signup', component: SignupComponent },

    {
      path:  'welcome', component: WelcomeComponent,  //Parent routes
      children : [
        {
          path: 'organize', component: OrganizeComponent
        }, 
        {
          path: 'groceries', component: GroceriesComponent
        }, 
      ]
    }



  ];
  