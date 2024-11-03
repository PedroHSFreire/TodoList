import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { navbarGuard } from './guards/navbar.guard';
import { ListaComponent } from './pages/lista/lista.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'profile',

    component: ProfileComponent,

    canActivate: [navbarGuard],
  },
  { path: '', component: LoginComponent },
];
