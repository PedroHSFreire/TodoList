import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { SearchStateService } from '../service/search-state.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.scss',
})
export class PesquisaComponent implements OnInit {
  selectedVideo: any = null;
  errorMessage: string = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private searchState: SearchStateService,
    public auth: AuthService
  ) {}
  ngOnInit(): void {
    this.searchState.searchQuery$.subscribe((query) => {
      if (query) {
        this.apiService.searchByTitle(query).subscribe((video) => {
          this.selectedVideo = video || null;
        });
      }
    });
  }
  goToPlayer(video: any): void {
    this.router.navigate(['/player'], { queryParams: { id: video.id } });
  }
  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isRotated: boolean = false;
  toggleRotation(): void {
    this.isRotated = !this.isRotated;
  }
  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
