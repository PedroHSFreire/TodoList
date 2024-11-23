import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { navbarGuard } from './guards/navbar.guard';
import { homeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: homeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  {
    path: 'profile',

    component: ProfileComponent,

    canActivate: [navbarGuard],
  },
  { path: '', component: LoginComponent },
  { path: '**', component: homeComponent },
];
