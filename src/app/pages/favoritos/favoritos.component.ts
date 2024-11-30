import { Component, OnInit } from '@angular/core';
import { ApiService, Task } from '../service/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})
export class FavoritosComponent implements OnInit {
  favorites: Task[] = [];
  searchQuery: string = '';
  videos: Task[] = [];
  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.loadCounters();
  }
  /*pesquisa*/

  search(): void {
    this.router.navigate(['/pesquisa', this.searchQuery]);
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }
  /*dropdown*/
  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isRotated: boolean = false;
  toggleRotation(): void {
    this.isRotated = !this.isRotated;
  }
  /*dropdown*/
  incrementViews(video: any) {
    const newViews = video.views++;
    this.apiService.updateViews(video.id, newViews).subscribe(() => {
      video.views = newViews;
    });
  }
  playVideo(video: Task): void {
    this.incrementViews(video);
    this.apiService.selectVideo(video);
    this.router.navigate(['/player']);
  }
  loadCounters(): void {
    this.apiService.getVideos().subscribe((data) => {
      this.videos = data;
    });
  }
  loadFavorites(): void {
    this.apiService.getFavorites().subscribe((data) => {
      this.favorites = data;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
