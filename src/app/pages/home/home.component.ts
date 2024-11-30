import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Task } from '../service/api.service';
import { Router } from '@angular/router';

import { SearchStateService } from '../service/search-state.service';

@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  videos: Task[] = [];
  searchQuery: string = '';

  constructor(
    public auth: AuthService,
    private apiService: ApiService,
    private router: Router,
    private searchState: SearchStateService
  ) {}
  /*pesquisa*/

  search(): void {
    if (this.searchQuery.trim()) {
      this.searchState.setSearchQuery(this.searchQuery);
      this.router.navigate(['/pesquisa']);
    }
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  /*dropdown*/
  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      console.log('Users:', this.users);
    });
    this.apiService.getVideos().subscribe((data) => {
      this.videos = data;
    });
    this.loadCounters();
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
  /*subir as views*/
  incrementViews(video: any) {
    const newViews = video.views++;
    this.apiService.updateViews(video.id, newViews).subscribe(() => {
      video.views = newViews;
    });
  }
  /*carrocel*/
  scrollLeft(carouselId: string): void {
    const carousel = document.getElementById(carouselId) as HTMLElement;
    if (carousel) {
      carousel.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(carouselId: string): void {
    const carousel = document.getElementById(carouselId) as HTMLElement;
    if (carousel) {
      carousel.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
  /*carrocel*/
  playPreview(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.play();
  }
  /*logout*/
  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
