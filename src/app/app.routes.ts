import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { navbarGuard } from './guards/navbar.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'profile',

    component: LoginComponent,

    canActivate: [navbarGuard],
  },
];
