import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

import { NgModule } from '@angular/core';
import { PlayerComponent } from './pages/player/player.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'Favoritos',
    component: FavoritosComponent,
  },

  {
    path: 'profile',

    component: ProfileComponent,

    canActivate: [AuthGuard],
  },
  {
    path: 'pesquisa',
    component: PesquisaComponent,
    canActivate: [AuthGuard],
  },

  { path: 'player', component: PlayerComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
