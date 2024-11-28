import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Task } from '../service/api.service';
import { debounceTime, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent implements OnInit {
  private searchSubject = new Subject<string>();
  users: any[] = [];
  videos: Task[] = [];
  results: any[] = [];
  searchPerformed = false;

  constructor(
    public auth: AuthService,
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
  ) {
    /*pesquisa*/
    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((query) => this.apiService.searchItems(query))
      )
      .subscribe((data) => {
        this.results = data;
        this.searchPerformed = true;
      });
  }
  /*pesquisa*/
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this.searchSubject.next(query);
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
  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      console.log('Users:', this.users);
    });

    this.apiService.getVideos().subscribe((data) => {
      this.videos = data;
      console.log('Videos:', this.videos);
    });
    this.apiService.getVideos().subscribe((data) => {
      this.videos = data;
    });
    this.loadCounters();
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
