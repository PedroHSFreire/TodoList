import { Component } from '@angular/core';

import { LoginComponent } from './login/login.component';

//componentes

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {}
