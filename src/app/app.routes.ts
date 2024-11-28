import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { navbarGuard } from './guards/navbar.guard';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { CategoriasComponent } from './pages/categorias/categorias.component';

import { NgModule } from '@angular/core';
import { PlayerComponent } from './pages/player/player.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'Categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',

    component: ProfileComponent,

    canActivate: [navbarGuard],
  },
  { path: 'player', component: PlayerComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: HomeComponent },
  { path: '**', component: CategoriasComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
